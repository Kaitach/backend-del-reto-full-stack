import { Deposit } from './../schemas/deposit.schema';
import { DepositSertivce } from "src/domain/service/deposit-domain.service";
import { IDepositRepository } from "../repository/DepositRepository";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { DepositEntity } from "src/domain";

@Injectable()
export class DepositServiceMongo implements DepositSertivce {
  constructor(private readonly repositori: IDepositRepository) {} 

  createDeposit( Deposit: DepositEntity): Observable<DepositEntity> {
    return this.repositori.createDeposit(Deposit)
  };
  updateDeposit(id: string, account: DepositEntity): Observable<DepositEntity> {
    return this.repositori.updateDeposit(id, account)

  };
  getDepositById(id: string): Observable<DepositEntity>{
    return this.repositori.getDepositById(id)

  };
  deleteDepositById(id: string): Observable<boolean>{
    return this.repositori.deleteDepositById(id)

  }
  ;
  getAllDepositByUserId(userId: string): Observable<DepositEntity[]>{
    return this.repositori.getAllDepositByUserId(userId)

  };

}