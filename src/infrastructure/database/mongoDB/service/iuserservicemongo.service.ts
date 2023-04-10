import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserrepository } from '../repository';
import { UserEntity, UserService } from 'src/domain';
import { RegisterUserDto } from 'src/infrastructure/utils';
import { LoginDto } from 'src/infrastructure/utils/DTOS/loginDto';
import { User } from '../schemas';

@Injectable()
export class IUserServiceMongo {
  constructor(private readonly IUserrepository: IUserrepository) {}
  getUserByemail(email: string): Observable<UserEntity> {
    console.log('locaaa' + email)
    return this.IUserrepository.getUserByEmail(email);
  }
  createUser(data: RegisterUserDto): Observable<UserEntity> {
    return this.IUserrepository.createUser(data);
  }
  updateUser(id: string, user: UserEntity): Observable<UserEntity> {
    return this.IUserrepository.updateUser(id, user);
  }
  getUserById(id: string): Observable<UserEntity> {
    return this.IUserrepository.getUserById(id);
  }
  deleteUserById(id: string): Observable<boolean> {
    return this.IUserrepository.deleteUserById(id);
  }
  getAllUsers(): Observable<UserEntity[]> {
    return this.IUserrepository.getAllUsers()
  }

  login(login: LoginDto): Observable<UserEntity> {
   return this.IUserrepository.login(login)
  }
}
