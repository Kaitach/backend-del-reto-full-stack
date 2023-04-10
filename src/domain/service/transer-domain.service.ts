import { Observable } from "rxjs";
import { transferEntity } from "../entities";

export interface TransferService {
  createTransfer( Transfer: transferEntity): Observable<transferEntity>;
 
}
