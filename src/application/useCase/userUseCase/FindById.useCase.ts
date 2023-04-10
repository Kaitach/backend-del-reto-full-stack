import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity, UserService } from "src/domain";

@Injectable()
export class finByIdUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {} 

  execute(id: string): Observable<UserEntity> {
    return this.userService.getUserById(id);
  }


}