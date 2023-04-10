import { Module } from "@nestjs/common";
import { MongoModule, UserController, AccountController, DepositController, TransferController, IUserServiceMongo, AccountServiceMongo, IAccountRepository, DepositServiceMongo, IDepositRepository, TransferServiceMongo, ITransferRepository } from "./infrastructure";


@Module({
  imports: [MongoModule,],
  controllers: [UserController, AccountController, DepositController, TransferController],
  providers: [ IUserServiceMongo, AccountServiceMongo,IAccountRepository, DepositServiceMongo, IDepositRepository, TransferServiceMongo, ITransferRepository  ],
})
export class AppModule {}

