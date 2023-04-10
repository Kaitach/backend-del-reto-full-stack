import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountEntity, AccountService } from "src/domain";

@Injectable()
export class FindAllAccountUseCase {

  constructor(
    private readonly AccountService: AccountService, 
  ) {} 

  execute(id: string): Observable<AccountEntity[]> {
    return this.AccountService.getAllAccountsByUserId(id);
  }


}