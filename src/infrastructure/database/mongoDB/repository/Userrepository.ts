import { LoginDto } from './../../../utils/DTOS/loginDto';
import { Account } from './../schemas/account.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, catchError, from, map, of, tap, throwError, throwIfEmpty } from 'rxjs';
import { UserEntity, UserService } from '../../../../domain';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../../../';
import { ObjectId } from 'mongodb';

@Injectable()
export class IUserrepository  {
  constructor(
    @InjectModel(User.name)
    private readonly userModule: Model<UserDocument>,
  ) {}

  createUser(user: RegisterUserDto): Observable<UserEntity> {
    const userRegister = this.userModule.create(user);
  
    return from(userRegister).pipe(
      tap((userDocument) => {
        console.log(`User ${userDocument.name} has been registered.`);
      }),
      map((userDocument) => {
        return new UserEntity(userDocument.id, userDocument.name, userDocument.email, userDocument.password,userDocument.document, userDocument.Account);
      })
    );
  }

  updateUser(id: string, data: RegisterUserDto): Observable<UserEntity> {
    const objectId = new ObjectId(id);
    return from(
      this.userModule.findOneAndUpdate(
        { _id: objectId },
        { $set: data },
        { new: true }
      ).exec()
    ).pipe(
      map((doc) => {
        const { _id, name, email, password, document, Account } = doc;
        return new UserEntity(_id.toString(), name, email, password, document, Account);
      })
    );
  }
  
  
  
  
  
  getUserById(id: string): Observable<UserEntity> {
    return from(this.userModule.findById(id).exec()).pipe(     
      map((doc) => {
        const user: UserEntity = {
          id: doc._id.toString(),
          Account: doc.Account,
          document: doc.document,
          email: doc.email,
          name: doc.name,
          password: doc.password,
        };
        return user;
      }),
      tap((user) => {
        console.log(`Usuario ${user.id} ha sido encontrado.`);
      }),
      catchError(() => { 
        throw new Error('Error al buscar el usuario');
      }),
    );
  }

  
deleteUserById(id: string): Observable<boolean> {
  const objectId = new ObjectId(id);
  return from(this.userModule.deleteOne({ _id: objectId }).exec()).pipe(
    map((result) => result.deletedCount > 0),
  );
  }
  
  getAllUsers(): Observable<UserEntity[]> {
    return from(this.userModule.find().exec()).pipe(
      map((userDocuments: UserDocument[]) => {
        const users = userDocuments.map((userDocument) => {
          const userEntity = new UserEntity();
          userEntity.id = userDocument._id;
          userEntity.name = userDocument.name;
          userEntity.email = userDocument.email;
          userEntity.password = userDocument.password;
          return userEntity;
        });
        return users;
      }),
      catchError((error) => {
        throw new Error('Error find user');
      })
    );
  }
  

  


  getUserByEmail(email: string): Observable<UserEntity> {
    return from(this.userModule.findOne({ email })).pipe(
      map((doc) => {
        if (!doc) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const user: UserEntity = {
          id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          password: doc.password,
          document: doc.document,
          Account: doc.Account,
        };
        return user;
      }),
      tap((user) => {
        console.log(`User ${user.id} has been found.`);
      }),
      catchError((err) => {
        console.log('Error:', err);
        throw new Error('Error find user' + email);
      })
    );
  }
  
  
  
  login(login: LoginDto): Observable<UserEntity> {
    return from(
      this.userModule.findOne({ email: login.email }).exec(),
    ).pipe(
      map((userDocument) => {
        const loginUser = new UserEntity();
        loginUser.id = userDocument._id;
        loginUser.Account = userDocument.Account;
        loginUser.document = userDocument.document;
        loginUser.email = userDocument.email;
        loginUser.name = userDocument.name;
        loginUser.password = userDocument.password;
        return loginUser;
      }),
    );
  }
  

 }





