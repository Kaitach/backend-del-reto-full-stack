import { UpdateAccountUseCase } from './../useCase/accountUseCase/updateAccount.UseCase';
import { Observable } from 'rxjs';
import { IUseCase } from '../useCase/interface/IUseCase.interface';
import { AccountService, UserService } from 'src/domain';
import { DeleteAccountUseCase } from '../useCase/accountUseCase/deleteAccount.UseCase';
import { createAccountUseCase } from '../useCase/accountUseCase/createAccount.UseCase';
import { FindAllAccountUseCase } from '../useCase/accountUseCase/findAllUserAccount.UseCase';
import { FindByIdAccountUseCase } from '../useCase';


export class AccountDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor( private readonly accountService: AccountService, private readonly UserService:UserService  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeleteaccount(): void {
    this.delegate = new DeleteAccountUseCase(this.accountService);
  }

 toCreateaccount(): void {
    this.delegate = new createAccountUseCase(this.accountService, this.UserService);
  }


  findById(): void {
    this.delegate = new FindByIdAccountUseCase(this.accountService);
  }

  updateAccount(): void {
    this.delegate = new UpdateAccountUseCase(this.accountService);
  }

  getAllUsersAccount(): void {
    this.delegate = new FindAllAccountUseCase(this.accountService);
  }

}