import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/Account.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
accountFormGroup!:FormGroup;
accountIdGlob!:string;
currentPage:number=0
size:number=5
accountObservable!:Observable<AccountDetails>
operationFormGroup!:FormGroup
  constructor(private fb:FormBuilder,private Accsrvc:AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control(''),
    });
    this.operationFormGroup=this.fb.group({
       operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
  }
  handleSearchAccount(){
    let accounId:string=this.accountFormGroup.value.accountId
    this.accountIdGlob=accounId;
    
  
this.accountObservable=this.Accsrvc.getAccount(accounId,this.currentPage,this.size)
console.log(this.accountObservable)
  }
  gotoPage(page:number){
    this.currentPage=page;
    this.handleSearchAccount();

  }
  handleAccountOperation(){
    
    let accountId=this.accountFormGroup.value.accounId
    console.log(accountId)
    
    let operationType:string=this.operationFormGroup.value.operationType
    let amount:number=this.operationFormGroup.value.amount
    let description:string=this.operationFormGroup.value.description
    let accountDestination:string=this.operationFormGroup.value.accountDestination
    
    if(operationType=="DEBIT"){
     this.Accsrvc.debit(this.accountIdGlob,amount,description).subscribe({
      next:(data)=>{
        alert(" successful debit")
        this.operationFormGroup.reset()

        this.handleSearchAccount();
      },
      error:(err)=>{
        console.log(err)
      }
     })
    }
    else if(operationType=="CREDIT"){
      this.Accsrvc.credit(this.accountIdGlob,amount,description).subscribe({
        next:(data)=>{
          alert("  successful credit")
          this.operationFormGroup.reset()
          this.handleSearchAccount();

        },
        error:(err)=>{
          console.log(err)
        }
       })

    }
    else if(operationType=="TRANSFER"){
      this.Accsrvc.transfer(this.accountIdGlob,accountDestination,amount,description).subscribe({
        next:(data)=>{
          alert("  successful transfer")
          this.operationFormGroup.reset()

          this.handleSearchAccount();

        },
        error:(err)=>{
          console.log(err)
        }
       })

    }
  }

}
