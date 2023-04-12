import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, from } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ObjectId } from 'mongodb';
import { Deposit, DepositDocument } from "../schemas";
import { DepositEntity } from "../../../../domain";
import { DepositDto } from "../../../../infrastructure/utils/DTOS/DepositDto";

@Injectable()
export class IDepositRepository {
  constructor(
    @InjectModel(Deposit.name)
    private readonly depositModule: Model<DepositDocument>
  ) {}

  createDeposit(deposit: DepositDto): Observable<DepositEntity> {
    const newDeposit = this.depositModule.create(deposit);
    return from(newDeposit).pipe(
      tap((DepositDocument) => {
        console.log(`Transfer ${DepositDocument.id} has been created.`);
      }),
      map((DepositDocument) => ({
        accountId: DepositDocument.accountId,
        amount: DepositDocument.amount,
        reason: DepositDocument.reason,
        userId: DepositDocument.userId,
      }))
    );
  }

  updateDeposit(id: string, data: DepositEntity): Observable<DepositEntity> {
    const objectId = new ObjectId(id);
    return from(
      this.depositModule
        .findByIdAndUpdate(objectId, { $set: data }, { new: true })
        .exec()
    ).pipe(
      map((doc) => {        
        const { _id, accountId, amount, reason, userId } = doc;
        return new DepositEntity( accountId,userId, amount, reason, );
      })
    );
}


  getDepositById(id: string): Observable<DepositEntity> {
    return from(this.depositModule.findById(id).exec()).pipe(     
      map((doc) => {
        const deposit: DepositEntity = {
         accountId: doc.accountId,
         amount: doc.amount,
         reason: doc.reason,
         userId: doc.userId,
        };
        return deposit;
      }),     
      catchError(() => { 
        throw new Error('Error al buscar el deposito');
      }),
    );
  }

  deleteDepositById(id: string): Observable<boolean> {
    const objectId = new ObjectId(id);
  return from(this.depositModule.deleteOne({ _id: objectId }).exec()).pipe(
    map((result) => result.deletedCount > 0),
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
