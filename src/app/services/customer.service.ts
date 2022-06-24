import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankAccount } from '../models/BankAccount.model';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  
  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers");
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword);
  }
  public saveCustomers(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/customers",customer);
  }
  public deleteCustomers(id:String){
    return this.http.delete(environment.backendHost+"/customers/"+id);
  }
  public getCustomerBankAccounts(id:String):Observable<Array<BankAccount>>{
     
    return this.http.get<Array<BankAccount>>(environment.backendHost+"/customer/accounts/"+id)

  }
}
