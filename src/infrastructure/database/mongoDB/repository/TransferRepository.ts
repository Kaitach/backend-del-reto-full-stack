import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, from, map } from "rxjs";

import { Transfer, TransferDocument } from "../schemas";
import { transferEntity } from "src/domain";
import { TransferDto } from "src/infrastructure/utils/DTOS/TransferDto";


@Injectable()
export class ITransferRepository {
  constructor(
    @InjectModel(Transfer.name)
    private readonly TransferModule: Model<TransferDocument>
  ) {} 

  createTransfer(Transfer: TransferDto): Observable<transferEntity> {
    const newTransfer = new this.TransferModule(Transfer);
    return from(newTransfer.save()).pipe(
      map((TransferDocument: TransferDocument) => TransferDocument.toObject())
    );
  }


}
