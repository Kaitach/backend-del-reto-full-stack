import { LoginDto } from './../../../utils/DTOS/loginDto';
import { Account } from './../schemas/account.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, catchError, from, map, tap, throwError, throwIfEmpty } from 'rxjs';
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


  updateUser(id: string, user: UserEntity): Observable<UserEntity> {
    const userDocument = new this.userModule(user);
    const objectId = new ObjectId(id);
  
    return from(
      this.userModule.findOneAndUpdate(
        { _id: objectId },
        { $set: { name: userDocument.name, email: userDocument.email, password: userDocument.password, document: userDocument.document, Account: userDocument.Account } },
        { new: true }
      )
    ).pipe(
      map((doc) => {
        return new UserEntity(doc.id, doc.name, doc.email, doc.password, doc.document, doc.Account);
      })
    );
  }
  
  

getUserById(id: string): Observable<UserEntity> {
  console.log('buscand')
  console.log(id)
  return from(this.userModule.findById(id)).pipe(
    map(userDocument => {
      if (!userDocument) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const user = userDocument.toObject();
      return new UserEntity(userDocument.id, userDocument.name, userDocument.email, userDocument.password,userDocument.document, userDocument.Account);
    })
  );
}

  
  deleteUserById(id: string): Observable<boolean> {
    return from(
      this.userModule.findByIdAndDelete(id).then((doc) => !!doc)
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
      throwIfEmpty(() => new HttpException('User not found', HttpStatus.NOT_FOUND)),
      map(userDocument => new UserEntity(userDocument.id, userDocument.name, userDocument.email, userDocument.password, userDocument.document, userDocument.Account)),
      catchError(err => {
        console.log('Error:', err);
        throw new Error('Error find user' + email);
      })
    );
    
  }



  
 login(login: LoginDto): Observable<UserEntity> {
  return from(
    this.userModule.findOne({ email: login.email }).exec(),
  ).pipe(   map((userDocument) => {
  
    const loginUser = new UserEntity()
    loginUser.id = userDocument._id
    loginUser.Account = userDocument.Account
    loginUser.document = userDocument.document
    loginUser.email = userDocument.email,
    loginUser.name = userDocument.name
    login.password = userDocument.password
    return loginUser;
  }));
}

 }





