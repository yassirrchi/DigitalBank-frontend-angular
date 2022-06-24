export interface BankAccount {
    id:            string;
    balance:       number;
    createdAt:     Date;
    status:        null;
    overDraft?:    number;
    interestRate?: number;
  
    
}