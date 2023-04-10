import { UserService } from './../../../domain/service/user-service-domain';
import { Account } from './../../../infrastructure/database/mongoDB/schemas/account.schema';
import { Injectable } from "@nestjs/common";
import { Observable, from, map, of, switchMap, tap } from "rxjs";
import { AccountEntity, AccountService, UserEntity } from "src/domain";

@Injectable()
export class createAccountUseCase {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService
  ) {}

  addAccountToUser(accountID: string, userID: string): Observable<UserEntity> {

      
    console.log(accountID)
    if (!accountID) {
        return of(null); // O cualquier otro valor que quieras usar para manejar el error
      }
    return this.userService.getUserById(userID).pipe(
      switchMap((user) => {
        const updatedUser = { ...user, Account: [...user.Account.filter(Boolean), accountID] };
        return this.userService.updateUser(user.id, updatedUser);
      })
    );
  }

  createNewAccount(account: AccountEntity): Observable<AccountEntity> {
    account.amount = 0
    return this.accountService.createAccount(account);
  }

  execute(account: AccountEntity): Observable<AccountEntity> {
    let newAccountId: string;
    
    return this.createNewAccount(account).pipe(
      tap((newAccount: AccountEntity) => {
        newAccountId = newAccount.id;
      }),
      switchMap(() => this.addAccountToUser(newAccountId, account.userID)),
      map(() => {
        console.log(newAccountId)
        account.id = newAccountId;
        return account;
      })
    );
  }
}
