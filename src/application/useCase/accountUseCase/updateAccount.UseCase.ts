import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountEntity, AccountService } from "src/domain";

@Injectable()
export class UpdateAccountUseCase {

  constructor(
    private readonly AccountService: AccountService, 
  ) {} 

  execute(id: string, Account: AccountEntity): Observable<AccountEntity> {
    return this.AccountService.updateAccount(id, Account);
  }


}