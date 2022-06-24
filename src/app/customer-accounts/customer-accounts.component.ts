import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccount } from '../models/BankAccount.model';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!:string;
  customer!:Customer;
   customerBankAccounts!:Observable<Array<BankAccount>>
   temp!:BankAccount[]

  constructor(private route:ActivatedRoute,private router:Router,private Servc:CustomerService) { 
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId=this.route.snapshot.params['id'];
   this.Servc.getCustomerBankAccounts(this.customerId).subscribe(data=>{this.temp=data })
  console.log(this.customerBankAccounts)
    
  }

}
