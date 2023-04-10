import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/domain";

@Injectable()
export class DeleteUserUseCase {

  constructor(
    private readonly userService: UserService, 
  ) {} 

  execute(id: string): Observable<boolean> {
    return this.userService.deleteUserById(id);
  }


}