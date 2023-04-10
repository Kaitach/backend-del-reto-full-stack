import { Observable } from 'rxjs';
import { IUseCase } from '../useCase/interface/IUseCase.interface';
import { UserService } from 'src/domain';
import { DeleteUserUseCase } from '../useCase/userUseCase/deleteUser.useCase';
import { RegisterUserUseCase } from '../useCase/userUseCase/RegisterUserUseCase';
import { LoginUseCase } from '../useCase/userUseCase/LoginUSerUseCase';
import { findByEmailUseCase } from '../useCase/userUseCase/findByEmail.useCase';
import { finByIdUseCase } from '../useCase/userUseCase/FindById.useCase';
import { UpdateUserUseCase } from '../useCase/userUseCase/updateUser.UseCase';
import { getAllUserCase } from '../useCase/userUseCase/getAllUser.useCase';


export class UserDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor( private readonly userService: UserService, ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toDeleteUser(): void {
    this.delegate = new DeleteUserUseCase(this.userService);
  }

 toCreateUser(): void {
    this.delegate = new RegisterUserUseCase(this.userService);
  }

  loginUser(): void {
    this.delegate = new LoginUseCase(this.userService);
  }

  findByEmail(): void {
    this.delegate = new findByEmailUseCase(this.userService);
  }

  findById(): void {
    this.delegate = new finByIdUseCase(this.userService);
  }

  updateUser(): void {
    this.delegate = new UpdateUserUseCase(this.userService);
  }

  getAllUsers(): void {
    this.delegate = new getAllUserCase(this.userService);
  }

}