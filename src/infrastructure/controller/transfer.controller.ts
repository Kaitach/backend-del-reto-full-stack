import { Body, Controller, Post } from "@nestjs/common";
import { TransferDelegate } from "src/application/delegate/transferDelegate";
import { TransferServiceMongo } from "../database/mongoDB/service/TransferMongo.service";
import { AccountServiceMongo } from "../database/mongoDB/service/accountmongo.service";
import { TransferDto } from "../utils/DTOS/TransferDto";
import { transferEntity } from "src/domain";
import { Observable } from "rxjs";

@Controller('transfer')
export class TransferController {

  private readonly useCase: TransferDelegate;

  constructor(  
    private readonly deposit: TransferServiceMongo,
    private readonly accountService: AccountServiceMongo, 
  ) {
    this.useCase = new TransferDelegate(this.deposit, this.accountService);;
  }

  @Post()
  registerDeposit(@Body() user: TransferDto): Observable<transferEntity> {
     this.useCase.tocreateTransfer()
   return this.useCase.execute(user)
  }
}