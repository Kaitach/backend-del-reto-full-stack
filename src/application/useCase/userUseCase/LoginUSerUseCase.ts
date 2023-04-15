import { Injectable } from "@nestjs/common";
import { Observable, from, of } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService, UserEntity } from "src/domain";

@Injectable()
export class LoginUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {}

  execute(data: string, password: string): Observable<string> {
    let user: UserEntity;
    console.log(password);
    return this.userService.getUserByemail(data)
      .pipe(
        filter(user => !!user),
        map(user => user as UserEntity),
        tap(foundUser => user = foundUser),
        switchMap((user) => {
          return from(bcrypt.compare(password, user.password));
        }),
        filter(passwordMatch => !!passwordMatch),
        switchMap(() => {
          const token = jwt.sign({ 
            id: user.id, 
            email: user.email, 
            name: user.name,
            Account: user.Account,
            password: user.password
          }, 'secret_key', { expiresIn: '1h' });
          return of(token);
        })
      );
  }
}
