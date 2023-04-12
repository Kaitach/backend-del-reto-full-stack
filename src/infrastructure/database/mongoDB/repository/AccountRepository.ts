
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Observable, from, map, mergeMap, catchError } from 'rxjs';
import { AccountEntity } from '../../../../domain';
import { AccountDto } from '../../../';
import { Account, AccountDocument } from '../schemas';


@Injectable()
export class IAccountRepository {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModule: Model<AccountDocument>,
  ) {}
  createAccount(account: AccountDto): Observable<AccountEntity> {
    console.log(account.userID);
    return from(this.accountModule.create(account)).pipe(
      map((createdAccount) => {
        const accountEnt = new AccountEntity();
        accountEnt.id = createdAccount._id;
        accountEnt.userID = account.userID;
        accountEnt.type = account.type;
        accountEnt.amount =  0
        console.log(accountEnt.amount)
        return accountEnt;
      })
    );
  }

  updateAccount(account: AccountDto): Observable<AccountEntity> {
    return from(this.accountModule.findById(account.id)).pipe(
      mergeMap((existingAccount) => {
        if (!existingAccount) {
          throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        }
        existingAccount.amount = account.amount;
        existingAccount.type = account.type;
        return from(existingAccount.save());
      }),
      map((updatedAccount) => new AccountEntity(updatedAccount.amount, updatedAccount.id, updatedAccount.type, updatedAccount.userID)),
      catchError((err) => {
        console.log('Error:', err);
        throw new Error(`Could not update account with ID ${account.id}.`);
      }),
    );
  }

  getAccountById(id: string): Observable<AccountEntity> {
    return from(this.accountModule.findById(id)).pipe(
      map(userDocument => {
        if (!userDocument) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return new AccountEntity(userDocument.amount, userDocument.id, userDocument.type, userDocument.userID);
      })
    );
  }
  


  deleteAccountById(id: string): Observable<boolean> {
    console.log(id);
    const objectId = new ObjectId(id);

    return from(this.accountModule.deleteOne({ _id: objectId }).then((result) => result.deletedCount > 0));
  }
  


  }