import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

import { Deposit, DepositDocument } from "../schemas";
import { DepositEntity } from "src/domain";
import { DepositDto } from "src/infrastructure/utils/DTOS/DepositDto";

@Injectable()
export class IDepositRepository {
  constructor(
    @InjectModel(Deposit.name)
    private readonly depositModule: Model<DepositDocument>
  ) {}

  createDeposit(deposit: DepositDto): Observable<DepositEntity> {
    const newDeposit = new this.depositModule(deposit);
    return from(newDeposit.save()).pipe(
      map((depositDocument: DepositDocument) => depositDocument.toObject())
    );
  }

  updateDeposit(id: string, deposit: DepositEntity): Observable<DepositEntity> {
    return from(
      this.depositModule.findByIdAndUpdate(id, deposit, { new: true })
    ).pipe(
      map((depositDocument: DepositDocument) => {
        if (!depositDocument) {
          return null;
        }
        return depositDocument.toObject();
      })
    );
  }

  getDepositById(id: string): Observable<DepositEntity> {
    return from(this.depositModule.findById(id)).pipe(
      map((depositDocument: DepositDocument) => {
        if (!depositDocument) {
          return null;
        }
        return depositDocument.toObject();
      })
    );
  }

  deleteDepositById(id: string): Observable<boolean> {
    return from(this.depositModule.findByIdAndDelete(id)).pipe(
      map((depositDocument: DepositDocument) => !!depositDocument)
    );
  }

  getAllDepositByUserId(userId: string): Observable<DepositEntity[]> {
    return from(
      this.depositModule.find({ userId })
    ).pipe(
      map((depositDocuments: DepositDocument[]) =>
        depositDocuments.map((depositDocument) => depositDocument.toObject() as DepositEntity)
      )
    );
  }

}
