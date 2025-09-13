import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
 employees: any[] = [];
  filteredEmployees: any[] = [];
  visibleEmployees: any[] = [];
  loading: boolean = true;
  pageSize: number = 20;
  searchId: string = '';

  constructor(private empService: EmployeeService, private router: Router ) {}

  ngOnInit() {
   this.loadEmployees()
  }
   loadEmployees() {
      this.empService.getAllEmployees().subscribe((data: any[]) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.visibleEmployees = this.filteredEmployees.slice(0, this.pageSize);
      this.loading = false;
    });
  }

  loadMore() {
    const next = this.visibleEmployees.length + this.pageSize;
    this.visibleEmployees = this.filteredEmployees.slice(0, next);
  }

  searchEmployee() {
    if (this.searchId.trim() === '') {
      this.filteredEmployees = this.employees;
    } else {

      this.filteredEmployees = this.employees.filter(emp =>
        emp.id.toString().includes(this.searchId.trim())
      );
    }
    this.visibleEmployees = this.filteredEmployees.slice(0, this.pageSize);
    this.searchId = ""

  }

  // editEmployee(id: number) {
  //   alert('Edit employee with ID: ' + id);
  // }

deleteEmployee(id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {

    this.empService.deleteEmployee(id).subscribe(
      {
      next: () => {
        alert('Employee deleted successfully!');

        this.loadEmployees(); 
      },
      error: (err) => {
        console.error('Delete failed:', err);

        alert('Failed to delete employee.');
      }
    });
  }
}


editEmployee(id: number): void {
  this.router.navigate(['/edit-employee', id]);
}
 
}
