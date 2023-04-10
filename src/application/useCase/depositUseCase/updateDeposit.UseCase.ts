import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountEntity, AccountService, DepositEntity } from "src/domain";
import { DepositSertivce } from "src/domain/service/deposit-domain.service";

@Injectable()
export class UpdateDepositUseCase {

  constructor(
    private readonly depositService: DepositSertivce, 
  ) {} 

  execute(id: string, Deposit: DepositEntity): Observable<DepositEntity> {
    return this.depositService.updateDeposit(id, Deposit);
  }


}