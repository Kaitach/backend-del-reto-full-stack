import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity, UserService } from "src/domain";

@Injectable()
export class UpdateUserUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {} 

  execute(id: string, data:UserEntity): Observable<UserEntity> {
    return this.userService.updateUser(id, data);
  }


}