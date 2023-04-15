import { UserEntity, UserService } from 'src/domain';
import { Observable, of, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InternalServerErrorException } from '@nestjs/common';
import { RegisterUserUseCase } from '..';

describe('LoginUseCase', () => {
  let useCase: RegisterUserUseCase;
  let repository: UserService

  beforeEach(() => {
    repository = {
        getUserByemail: jest.fn(),
        createUser: jest.fn()
    } as any as UserService;
    useCase = new RegisterUserUseCase(repository);
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
  
    useCase.execute(mockUser).subscribe(token => {
      expect(token).toBe(undefined); // esperamos que no se genere un token si el usuario es nulo
    });
  
    expect(compareSpy).not.toHaveBeenCalled(); // comprobamos que no se ha intentado comparar contraseñas si el usuario es nulo
    expect(jwtSpy).not.toHaveBeenCalled(); // comprobamos que no se ha intentado firmar un token si el usuario es nulo
  });
  
  it('should create a new user and return a JWT token', () => {
    const mockUser = { 
      name: 'John',
      email: 'john@example.com',
      password: 'password'
    } as Partial<UserEntity>;
  
    const createdUser = { 
      id: '1',
      name: 'John',
      email: 'john@example.com',
      password: 'hashedPassword'
    } as UserEntity;
  
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(of('hashedPassword')); // hacemos que el hash de la contraseña devuelva un valor
    jest.spyOn(repository, 'createUser').mockReturnValueOnce(of(createdUser)); // hacemos que la creación del usuario devuelva un valor
  
    const jwtSpy = jest.spyOn(jwt, 'sign').mockReturnValue('jwtToken'); // hacemos que la firma del token devuelva un valor
  
    useCase.execute(mockUser).subscribe(token => {
      expect(token).toBe('jwtToken'); // esperamos que se genere un token si el usuario se ha creado correctamente
    });
  
    expect(jwtSpy).toHaveBeenCalledWith({ 
      id: createdUser.id, 
      email: createdUser.email, 
      name: createdUser.name,
      password: createdUser.password
    }, 'secret_key', { expiresIn: '1h' }); // comprobamos que se ha firmado el token correctamente con los datos del usuario creado
  });
  


    });
