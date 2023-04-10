import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity, UserService } from "src/domain";

@Injectable()
export class findByEmailUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {} 

  execute(email: string): Observable<UserEntity> {
    return this.userService.getUserByemail(email);
  }


}