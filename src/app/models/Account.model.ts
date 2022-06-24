import { AccountOperations } from "./AccountOperations.model";

export interface AccountDetails {
    accountId:               string;
    balance:                 number;
    currentPage:             number;
    pageSize:                number;
    type:                    null;
    accountOperationDTOList: AccountOperations[];
    totalPages:              number;
}