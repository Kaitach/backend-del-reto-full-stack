import { Observable } from "rxjs";
import { UserEntity } from "../entities";

export interface UserService {
  createUser(user: UserEntity): Observable<UserEntity>;
  updateUser(id: string, user: UserEntity): Observable<UserEntity>;
  getUserById(id: string): Observable<UserEntity>;
  deleteUserById(id: string): Observable<boolean>;
  getAllUsers(): Observable<UserEntity[]>;
  getUserByemail(email: string): Observable<UserEntity>;


}
