import { Deposit } from './../../infrastructure/database/mongoDB/schemas/deposit.schema';
import { UpdateAccountUseCase } from './../useCase/accountUseCase/updateAccount.UseCase';
import { Observable } from 'rxjs';
import { IUseCase } from '../useCase/interface/IUseCase.interface';
import { AccountService, UserService } from 'src/domain';
import { DeleteAccountUseCase } from '../useCase/accountUseCase/deleteAccount.UseCase';
import { createAccountUseCase } from '../useCase/accountUseCase/createAccount.UseCase';
import { FindByIdAccountUseCase } from '../useCase/accountUseCase/findById.useCAse';
import { FindAllAccountUseCase } from '../useCase/accountUseCase/findAllUserAccount.UseCase';
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';
import { DeleteDepositUseCase } from '../useCase/depositUseCase/deleteDeposit.UseCase';
import { FindAllDeposittUseCase } from '../useCase/depositUseCase/findAllUserDeposit.UseCase';
import { UpdateDepositUseCase } from '../useCase/depositUseCase/updateDeposit.UseCase';
import { FindByIdDepositUseCase } from '../useCase/depositUseCase/findById.UseCase';
import { createDepositUseCase } from '../useCase/depositUseCase/createDeposit.UseCase';


export class DepositDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor( private readonly accountService: AccountService, private readonly Deposit:DepositSertivce  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeleteDeposit(): void {
    this.delegate = new DeleteDepositUseCase(this.Deposit);
  }

 toCreateDeposit(): void {
    this.delegate = new createDepositUseCase(this.accountService, this.Deposit);
  }


  findById(): void {
    this.delegate = new FindByIdDepositUseCase(this.Deposit);
  }

  updateDeposit(): void {
    this.delegate = new UpdateDepositUseCase(this.Deposit);
  }

  getAllUsersDeposit(): void {
    this.delegate = new FindAllDeposittUseCase(this.Deposit);
  }

}