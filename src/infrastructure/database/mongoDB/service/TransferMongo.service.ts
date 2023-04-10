import { TransferService } from "src/domain/service/transer-domain.service";
import { ITransferRepository } from "../repository/TransferRepository";
import { Injectable } from "@nestjs/common";
import { transferEntity } from "src/domain";
import { Observable } from "rxjs";
import { TransferDto } from "src/infrastructure/utils/DTOS/TransferDto";

@Injectable()
export class TransferServiceMongo implements TransferService {
  constructor(private readonly repositori: ITransferRepository) {} 


  createTransfer( Transfer: TransferDto): Observable<transferEntity>{
    return this.repositori.createTransfer(Transfer)
  }


  } 