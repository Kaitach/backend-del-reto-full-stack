import { DepositServiceMongo } from './infrastructure/database/mongoDB/service/DepositMongo.service';
import { UserController } from './infrastructure/controller/user.controller';
import { Module } from '@nestjs/common';
import { IUserServiceMongo } from './infrastructure/database/mongoDB/service/iuserservicemongo.service';
import { AccountServiceMongo } from "src/infrastructure/database/mongoDB/service/accountmongo.service";
import { IUserrepository, MongoModule } from './infrastructure';
import { IAccountRepository } from './infrastructure/database/mongoDB/repository/AccountRepository';
import { AccountController } from './infrastructure/controller/account.controller';
import { DepositController } from './infrastructure/controller/deposit.controller';
import { IDepositRepository } from './infrastructure/database/mongoDB/repository/DepositRepository';
import { TransferController } from './infrastructure/controller/transfer.controller';
import { TransferServiceMongo } from './infrastructure/database/mongoDB/service/TransferMongo.service';
import { ITransferRepository } from './infrastructure/database/mongoDB/repository/TransferRepository';

@Module({
  imports: [MongoModule,],
  controllers: [UserController, AccountController, DepositController, TransferController],
  providers: [ IUserServiceMongo, AccountServiceMongo,IAccountRepository, DepositServiceMongo, IDepositRepository, TransferServiceMongo, ITransferRepository  ],
})
export class AppModule {}

