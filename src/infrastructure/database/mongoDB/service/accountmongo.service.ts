import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserrepository } from '../repository';
import {
  AccountEntity,
  AccountService,
  UserEntity,
  UserService,
} from '../../../../domain';
import { IAccountRepository } from '../repository/AccountRepository';
import { AccountDto } from '../../../';

@Injectable()
export class AccountServiceMongo implements AccountService {
  constructor(private readonly repositori: IAccountRepository) {}

  createAccount(
    account: AccountDto
  ): Observable<AccountEntity> {
    
    return this.repositori.createAccount( account);
  }
  updateAccount(id: string, account: AccountEntity): Observable<AccountEntity> {
    return this.repositori.updateAccount( account)  }
  getAccountById(id: string): Observable<AccountEntity> {
    return this.repositori.getAccountById(id)  }
  deleteAccountById(id: string): Observable<boolean> {
    return this.repositori.deleteAccountById(id)  }
  getAllAccountsByUserId(userId: string): Observable<AccountEntity[]> {
    return this.repositori.getAllAccountsByUserId(userId)
 }
}
