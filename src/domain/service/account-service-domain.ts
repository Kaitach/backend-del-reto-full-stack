import { Observable } from "rxjs";
import { AccountEntity } from "../entities";

export interface AccountService {
  createAccount( account: AccountEntity): Observable<AccountEntity>;
  updateAccount(id: string, account: AccountEntity): Observable<AccountEntity>;
  getAccountById(id: string): Observable<AccountEntity>;
  deleteAccountById(id: string): Observable<boolean>;
}
