import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountService } from "../../../domain";

@Injectable()
export class DeleteAccountUseCase {

  constructor(
    private readonly AccountService: AccountService, 
  ) {} 

  execute(id: string): Observable<boolean> {
    return this.AccountService.deleteAccountById(id);
  }


}