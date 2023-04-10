import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountService } from "src/domain";
import { DepositSertivce } from "src/domain/service/deposit-domain.service";

@Injectable()
export class DeleteDepositUseCase {

  constructor(
    private readonly depositService: DepositSertivce, 
  ) {} 

  execute(id: string): Observable<boolean> {
    return this.depositService.deleteDepositById(id);
  }


}