import { UserService } from './../../../domain/service/user-service-domain';
import { Account } from './../../../infrastructure/database/mongoDB/schemas/account.schema';
import { Injectable } from '@nestjs/common';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { AccountEntity, AccountService, UserEntity, transferEntity } from 'src/domain';
import { TransferService } from 'src/domain/service/transer-domain.service';

@Injectable()
export class createTransferUseCase {
  constructor(
    private readonly accountService: AccountService,
    private readonly transferService: TransferService,
  ) {}

  execute(transfer: transferEntity): Observable<transferEntity> {
    let newtransferId: string;
    let senderAccount$: Observable<AccountEntity> = this.accountService.getAccountById(transfer.senderAccountId)
    let receiverAccount$: Observable<AccountEntity> = this.accountService.getAccountById(transfer.receiverAccountId)

    return senderAccount$.pipe(
      switchMap(senderAccount => {
        if (senderAccount.amount < transfer.amount) {
          throw new Error("The sender account doesn't have enough money");
        }

        return receiverAccount$.pipe(
          switchMap(receiverAccount => {
            senderAccount.amount -= transfer.amount;
            receiverAccount.amount += transfer.amount;

            return from(this.accountService.updateAccount(senderAccount.id, senderAccount )).pipe(
              switchMap(_ => this.accountService.updateAccount(receiverAccount.id, receiverAccount)),
              switchMap(_ => this.transferService.createTransfer(transfer)),
              map(createdTransfer => {
                newtransferId = createdTransfer.id;
                return createdTransfer;
              })
            );
          })
        );
      }),
      tap(_ => console.log(`Transfer ${newtransferId} created`))
    );
  }
}
