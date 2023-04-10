import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountEntity, AccountService } from "src/domain";

@Injectable()
export class FindByIdAccountUseCase {

  constructor(
    private readonly AccountService: AccountService, 
  ) {} 

  execute(id: string): Observable<AccountEntity> {
    return this.AccountService.getAccountById(id);
  }


}