
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
    const objectId = new ObjectId(account.id);
    return from(
      this.accountModule.findOneAndUpdate(
        { _id: objectId },
        { $set: account },
        { new: true }
      ).exec()
    ).pipe(
      map((doc) => {
        const { id,
           type,
          amount,
          userID } = doc;
        return new AccountEntity( amount, id.toString(), type, userID);
      })
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
    const objectId = new ObjectId(id);

    return from(this.accountModule.deleteOne({ _id: objectId }).exec()).pipe(
      map((result) => result.deletedCount > 0),
    );  }
  


  }