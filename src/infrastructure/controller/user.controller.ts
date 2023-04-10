import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AccountService, UserEntity, UserService } from '../../domain';
import { Observable } from 'rxjs';
import { IUserServiceMongo } from '../database/mongoDB/service/iuserservicemongo.service';
import { LoginDto } from '../utils/DTOS/loginDto';
import { UserDelegate } from '../../application/delegate/userDelegate';
import { RegisterUserDto } from '../utils';

@Controller('users')
export class UserController {

  private readonly useCase: UserDelegate;

  constructor(  private readonly userService: IUserServiceMongo) {
    this.useCase = new UserDelegate(this.userService);
  }

  @Post()
  registerUser(@Body() user: RegisterUserDto): Observable<UserEntity> {
     this.useCase.toCreateUser()
   return this.useCase.execute(user)
  }

  @Get(':id')
  getUserByID(@Param('id') id: string): Observable<UserEntity>{
    this.useCase.findById()
    return this.useCase.execute(id)
  }
  

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<boolean> {
    this.useCase.toDeleteUser()
    return this.useCase.execute(id);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Observable<UserEntity> {
    this.useCase.findByEmail()
    return this.useCase.execute(email);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: RegisterUserDto
  ): Observable<UserEntity> {
    this.useCase.updateUser()
    return this.useCase.execute(id, user);
  }

  @Post('/login')
  login(
    @Body() data: LoginDto

  ): Observable<{ accessToken: string }> {
    this.useCase.loginUser()
    return this.useCase.execute(data.email, data.password);
  }


  @Get()
  getAllUser(): Observable<UserEntity[]>{
    this.useCase.getAllUsers()
    return this.useCase.execute()
  }

}


















