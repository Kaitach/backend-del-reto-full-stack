import { Injectable } from "@nestjs/common";
import { Observable, from } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService, UserEntity } from "src/domain";

@Injectable()
export class RegisterUserUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {}

  execute(data: Partial<UserEntity>): Observable<string> {
    return from(bcrypt.hash(data.password as string, 10))
      .pipe(
        switchMap((hash) => {
          const newUser = { ...data, password: hash };
          return this.userService.createUser(newUser as UserEntity)
        }),
        map((user) => {
          const token = jwt.sign({ 
            id: user.id, 
            email: user.email, 
            name: user.name,
            password: user.password
          }, 'secret_key', { expiresIn: '1h' });
          return token;
        })
      );
  }
}
