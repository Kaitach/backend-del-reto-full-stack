import { IUserrepository } from './repository/Userrepository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../mongoDB/schemas/user.schema';
import { Deposit, DepositSchema } from './schemas/deposit.schema';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountServiceMongo } from './service/accountmongo.service';
import { IAccountRepository } from './repository/AccountRepository';
import { Transfer, TransferSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.mdz3crh.mongodb.net/?retryWrites=true&w=majority',
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Deposit.name, schema: DepositSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Transfer.name, schema: TransferSchema },
    ]),
  ],
  controllers: [],
  providers: [  IUserrepository],
  exports: [

   
    IUserrepository,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Deposit.name, schema: DepositSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Transfer.name, schema: TransferSchema },
    ]),
  ],
})
export class MongoModule {}
