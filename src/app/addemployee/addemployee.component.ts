import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CountryServiceService } from '../country-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent {

    addForm!: FormGroup;
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private countryService: CountryServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required]
    });

    this.countryService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error fetching countries', err)
    });
  }
    
  onSubmit(): void {
    if (this.addForm.valid) {
      this.empService.createEmployee(this.addForm.value).subscribe(() => {
        alert('Employee added successfully!');
      
        this.addForm.reset();
 
        this.router.navigate(['/employees']);
      });
    }
  }


  cancelAction(){
     this.router.navigate(['/']); 
  }
  
}
