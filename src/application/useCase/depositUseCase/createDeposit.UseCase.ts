import { UserService } from '../../../domain/service/user-service-domain';
import { Account } from '../../../infrastructure/database/mongoDB/schemas/account.schema';
import { Injectable } from "@nestjs/common";
import { Observable, from, map, of, switchMap, tap } from "rxjs";
import { AccountEntity, AccountService, DepositEntity, UserEntity } from "src/domain";
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';

@Injectable()
export class createDepositUseCase {
  constructor(
    private readonly accountService: AccountService,
    private readonly DepositService: DepositSertivce
  ) {}


  execute(deposit: DepositEntity): Observable<DepositEntity> {
    return this.DepositService.createDeposit(deposit).pipe(
      switchMap(createdDeposit => {
        return this.accountService.getAccountById(createdDeposit.accountId).pipe(
          map(account => {
            console.log(account.amount)
            console.log(createdDeposit.amount)

            account.amount += createdDeposit.amount; 
            console.log(account)
            return account;
          }),
          switchMap(updatedAccount => {
            console.log(updatedAccount.amount)
            return this.accountService.updateAccount(deposit.accountId, updatedAccount);
          }),
          map(() => createdDeposit)
        )
      })
    );
  }
  
}
