import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, from, map, tap } from "rxjs";

import { Transfer, TransferDocument } from "../schemas";
import { transferEntity } from "../../../../domain";
import { TransferDto } from "../../../../infrastructure/utils/DTOS/TransferDto";


@Injectable()
export class ITransferRepository {
  constructor(
    @InjectModel(Transfer.name)
    private readonly TransferModule: Model<TransferDocument>
  ) {} 

  createTransfer(transfer: TransferDto): Observable<transferEntity> {
    const newTransfer = this.TransferModule.create(transfer);
    return from(newTransfer).pipe(
      tap((transferDocument) => {
        console.log(`Transfer ${transferDocument.id} has been created.`);
      }),
      map((transferDocument) => ({
        id: transferDocument.id,
        senderAccountId: transferDocument.senderAccountId,
        receiverAccountId: transferDocument.receiverAccountId,
        amount: transferDocument.amount,
      }))
    );
  }
  
  


}
