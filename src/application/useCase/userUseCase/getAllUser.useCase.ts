import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity, UserService } from "src/domain";

@Injectable()
export class getAllUserCase {

  constructor(
    private readonly userService: UserService, 
  ) {} 

  execute(): Observable<UserEntity[]> {
    return this.userService.getAllUsers();
  }


}