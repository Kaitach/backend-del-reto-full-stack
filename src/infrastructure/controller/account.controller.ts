import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AccountEntity, AccountService, UserEntity, UserService } from '../../domain';
import { Observable } from 'rxjs';
import { IUserServiceMongo } from '../database/mongoDB/service/iuserservicemongo.service';
import { LoginDto } from '../utils/DTOS/loginDto';
import { UserDelegate } from '../../application/delegate/userDelegate';
import { AccountServiceMongo } from '../database/mongoDB/service/accountmongo.service';
import { AccountDelegate } from '../../application/delegate/accountDelegate';
import { AccountDto } from '../utils/DTOS/AccountDto';

@Controller('account')
export class AccountController {

  private readonly useCase: AccountDelegate;

  constructor(  
    private readonly UserService: IUserServiceMongo,
    private readonly accountService: AccountServiceMongo, 
  ) {
    this.useCase = new AccountDelegate(this.accountService, this.UserService);;
  }

  @Post()
  registerAccount(@Body() user: AccountDto): Observable<AccountEntity> {
     this.useCase.toCreateaccount()
   return this.useCase.execute(user)
  }

  @Get(':id')
  getaccountByID(@Param('id') id: string): Observable<AccountEntity>{
    this.useCase.findById()
    return this.useCase.execute(id)
  }
  

  @Delete(':id')
  deleteaccount(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeleteaccount()
    return this.useCase.execute(id);
  }


  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: AccountDto
  ): Observable<AccountEntity> {
    this.useCase.updateAccount()
    return this.useCase.execute(id, user);
  }




}


















