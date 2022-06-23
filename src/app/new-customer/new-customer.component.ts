import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
newCustomerFormGroup!:FormGroup;
  constructor(private fb: FormBuilder,private customerService :CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      email:this.fb.control("",[Validators.required,Validators.email])
    })
  }

  handleSaveCustomer():void{
let customer:Customer =this.newCustomerFormGroup.value
this.customerService.saveCustomers(customer).subscribe({
  next:data=>{
    alert("customer has been added")
     this.router.navigateByUrl("/customers");
  },
  error:err=>{
    alert(err)
  }
});
  }

}
