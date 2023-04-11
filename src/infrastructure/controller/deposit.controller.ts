import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AccountEntity, AccountService, DepositEntity, UserEntity, UserService } from '../../domain';
import { Observable } from 'rxjs';
import { IUserServiceMongo } from '../database/mongoDB/service/iuserservicemongo.service';
import { LoginDto } from '../utils/DTOS/loginDto';
import { UserDelegate } from '../../application/delegate/userDelegate';
import { AccountServiceMongo } from '../database/mongoDB/service/accountmongo.service';
import { AccountDelegate } from 'src/application/delegate/accountDelegate';
import { AccountDto } from '../utils/DTOS/AccountDto';
import { DepositServiceMongo } from '../database/mongoDB/service/DepositMongo.service';
import { DepositDelegate } from '../../application/delegate/depositDelegate';
import { DepositDto } from '../utils/DTOS/DepositDto';

@Controller('deposit')
export class DepositController {

  private readonly useCase: DepositDelegate;

  constructor(  
    private readonly deposit: DepositServiceMongo,
    private readonly accountService: AccountServiceMongo, 
  ) {
    this.useCase = new DepositDelegate(this.accountService, this.deposit);;
  }

  @Post()
  registerDeposit(@Body() user: DepositDto): Observable<DepositEntity> {
     this.useCase.toCreateDeposit()
   return this.useCase.execute(user)
  }

  @Get(':id')
  getaccountByID(@Param('id') id: string): Observable<DepositEntity>{
    this.useCase.findById()
    return this.useCase.execute(id)
  }
  

  @Delete(':id')
  deleteDeposit(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeleteDeposit()
    return this.useCase.execute(id);
  }


  @Put(':id')
  updateDeposit(
    @Param('id') id: string,
    @Body() user: DepositDto
  ): Observable<DepositEntity> {
    this.useCase.updateDeposit()
    return this.useCase.execute(id, user);
  }

  @Get('all/:id')
  getallDepositByID(@Param('id') id: string): Observable<DepositEntity>{
    this.useCase.getAllUsersDeposit()
    return this.useCase.execute(id)
  }

}


















