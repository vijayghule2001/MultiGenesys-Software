import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { CountryServiceService } from '../country-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editemployee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './editemployee.component.html',
  styleUrl: './editemployee.component.css'
})
export class EditemployeeComponent {
editForm!: FormGroup;
  employeeId!: number;
  loading = true;
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService,
    private countryService: CountryServiceService
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadCountries();
    this.loadEmployee();
  }
 
  private initForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required]
    });
  }

 
  private loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data
      },
      error: (err) => console.error('Error fetching countries', err)
    });
  }

 
 private loadEmployee(): void {
  this.empService.getEmployeeById(this.employeeId).subscribe({
    next: (emp) => {
      console.log(emp)
      this.editForm.patchValue({
        name: emp.name,
        emailId: emp.emailId,
        mobile: emp.mobile,
        country: emp.country,   
        state: emp.state,
        district: emp.district
      });
      console.log(this.editForm.value)
      this.loading = false;
    },
    error: () => {
      alert('Employee not found');
      this.router.navigate(['/employees']);
    }
  });
}
 
  onSubmit(): void {
    if (this.editForm.valid) {
      this.empService.updateEmployee(this.employeeId, this.editForm.value).subscribe(() => {
        console.log(this.editForm.value)
        alert('Employee updated successfully ');
        this.router.navigate(['/employees']);
      });
    }
  }

  // Cancel and navigate back
  cancelAction(): void {
    this.router.navigate(['/employees']);
  }

}
