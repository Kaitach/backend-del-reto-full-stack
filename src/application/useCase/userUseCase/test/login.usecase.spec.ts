import { UserEntity, UserService } from 'src/domain';
import { Observable, of, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InternalServerErrorException } from '@nestjs/common';
import { LoginUseCase } from '..';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let repository: UserService

  beforeEach(() => {
    repository = {
        getUserByemail: jest.fn(),
    } as any as UserService;
    useCase = new LoginUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should filter out null users', () => {
    const mockUser = { id: '1', name: 'John', email: 'john@example.com' } as UserEntity;
    const mockPassword = 'password';
  
    jest.spyOn(repository, 'getUserByemail').mockReturnValue(of(null)); // el servicio devuelve un usuario nulo
    const compareSpy = jest.spyOn(bcrypt, 'compare').mockReturnValue(of(true)); // hacemos que la comparación de contraseñas devuelva true para que el flujo continúe
    const jwtSpy = jest.spyOn(jwt, 'sign').mockReturnValue('jwtToken'); // hacemos que la firma del token devuelva un valor
  
    useCase.execute(mockUser.email, mockPassword).subscribe(token => {
      expect(token).toBe(undefined); // esperamos que no se genere un token si el usuario es nulo
    });
  
    expect(compareSpy).not.toHaveBeenCalled(); // comprobamos que no se ha intentado comparar contraseñas si el usuario es nulo
    expect(jwtSpy).not.toHaveBeenCalled(); // comprobamos que no se ha intentado firmar un token si el usuario es nulo
  });
  


  it('should call repository.delete', () => {

    const _id = '641c65deff0153dd0f36bf5';
    const password = '641c65deff0153dd0f36bf5';

    const mockData: UserEntity = {
        document: 22213,
        id :  '641c65deff0153dd0f36bf5',
        name:  'string',
        email:  'string@gmail.com',
        password:  '12312323',
        Account:  []
    }
     
    const expectedData = true;
    const expectedInstanceType = Observable<UserEntity>;
    const stubDelete = jest.fn(
      () =>
        new Observable<UserEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'getUserByemail').mockReturnValue(stubDelete());


    const result = useCase.execute(_id, password);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
      },
    });
  });

    });
