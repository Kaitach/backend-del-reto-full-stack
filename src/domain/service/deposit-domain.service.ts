import { Deposit } from './../../infrastructure/database/mongoDB/schemas/deposit.schema';
import { Observable } from "rxjs";
import { AccountEntity, DepositEntity } from "../entities";

export interface DepositSertivce {
  createDeposit( Deposit: DepositEntity): Observable<DepositEntity>;
  updateDeposit(id: string, account: DepositEntity): Observable<DepositEntity>;
  getDepositById(id: string): Observable<DepositEntity>;
  deleteDepositById(id: string): Observable<boolean>;
  getAllDepositByUserId(userId: string): Observable<DepositEntity[]>;
}
