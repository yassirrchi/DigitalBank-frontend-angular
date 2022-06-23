import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!:Observable<Array<Customer>>;
  errorMessage!:String;
  searchformGroup!:FormGroup  ;
  

  constructor(private servc:CustomerService,private fb:FormBuilder) { }

  

  ngOnInit(): void {
    this.searchformGroup=this.fb.group({
      keyword:this.fb.control("")
    })
 this.customers=this.servc.getCustomers().pipe(
  catchError(err=>{
    this.errorMessage=err.message;
    return throwError(err);
  })
 );

  }

  handleSearchCustomer():void{
    let kw=this.searchformGroup?.value.keyword;
    this.customers=this.servc.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      }));
  }
  handleDeleteCustomer(id:String):void{
    let conf=confirm("are you sure you want to delete ")
    if(!conf)
    return 
    this.servc.deleteCustomers(id).subscribe({
      next:(resp)=>{
     this.handleSearchCustomer();
      },
      error:err=>{
        alert(err);
      }
    });

  }

}
