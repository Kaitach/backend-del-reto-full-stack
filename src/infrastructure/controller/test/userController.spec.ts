import { TestingModule, Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { UserDelegate } from '../../../application/delegate/userDelegate';
import { UserEntity } from '../../../domain';
import { IUserServiceMongo, LoginDto } from '../../';
import { RegisterUserDto } from '../../';
import { UserController } from '../user.controller';

import * as delegate from '../../../application/delegate/userDelegate';

jest.mock('../../../application/delegate/userDelegate');

describe('UserController', () => {
  let controller: UserController;
  let userService: IUserServiceMongo;
  const id = '1';

  jest
    .spyOn(delegate, 'UserDelegate')
    .mockReturnValue({} as any as delegate.UserDelegate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUserServiceMongo,
          useValue: {
            // Define aquí los métodos que el controlador usa del servicio
            createdUser : jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
            login: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<IUserServiceMongo>(IUserServiceMongo);
  });

  it('delegate created', () => {
    expect(controller).toBeDefined();
    expect(delegate.UserDelegate).toBeCalledWith(userService);
  });

  describe('registerUser', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: RegisterUserDto = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            

          };
    

          const stubCreate = jest.fn((data: RegisterUserDto) => {
            return new Observable<UserEntity>((subscriber) => {
              subscriber.next({ ...data } as UserEntity);
              subscriber.complete();
            });
          });
          
      const createdUser: RegisterUserDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        document: 3,
        password: 'password',
      } ;
      
      (controller as any).useCase =
        {
            toCreateUser: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.registerUser(user)

    expect(stubCreate).toHaveBeenCalledWith(user)
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });







  })


  describe('updaterUser', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn((id: string, data: UserEntity) => {
            return new Observable<UserEntity>((subscriber) => {
              subscriber.next({...data, id}  as UserEntity);
              subscriber.complete();
            });
          });
          
      const createdUser: UserEntity = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        document: 3,
        Account: [],
        id: '1',
      } ;
      
      (controller as any).useCase =
        {
            updateUser: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.updateUser(user.id, user )

    expect(stubCreate).toHaveBeenCalledWith(user.id, user )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })

  describe('getrUser', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn(() => {
            return new Observable<UserEntity>((subscriber) => {
              subscriber.next(createdUser as UserEntity);
              subscriber.complete();
            });
          });
          
      const createdUser: UserEntity = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        document: 3,
        Account: [],
        id: '1',
      } ;
      
      (controller as any).useCase =
        {
            findById: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.getUserByID(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })


  describe('getrUserEmail', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn(() => {
            return new Observable<UserEntity>((subscriber) => {
              subscriber.next(createdUser as UserEntity);
              subscriber.complete();
            });
          });
          
      const createdUser: UserEntity = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        document: 3,
        Account: [],
        id: '1',
      } ;
      
      (controller as any).useCase =
        {
            findByEmail: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.getUserByEmail(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })

  describe('getrUserAll', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn(() => {
            return new Observable<UserEntity[]>((subscriber) => {
              subscriber.next(createdUser);
              subscriber.complete();
            });
          });
          
          const createdUser: UserEntity[] = [{
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
          }];
      
      (controller as any).useCase =
        {
            getAllUsers: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.getAllUser( )

    expect(stubCreate).toHaveBeenCalledWith( )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })
  

  describe('delete', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn(() => {
            return new Observable<UserEntity>((subscriber) => {
              subscriber.next(createdUser as UserEntity);
              subscriber.complete();
            });
          });
          
      const createdUser: UserEntity = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        document: 3,
        Account: [],
        id: '1',
      } ;
      
      (controller as any).useCase =
        {
            toDeleteUser: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.deleteUser(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })

  describe('login', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const user: UserEntity = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            document: 3,
            Account: [],
            id: '1',
            

          };
    

          const stubCreate = jest.fn((login) => {
            return new Observable<LoginDto>((subscriber) => {
              subscriber.next(login);
              subscriber.complete();
            });
          });
          
      const createdUser: UserEntity = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        document: 3,
        Account: [],
        id: '1',
      } ;

      const login: LoginDto = {
        email: 'johndoe@example.com',
        password: 'password',
       
      } ;
      
      (controller as any).useCase =
        {
            loginUser: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.login( {"email": "johndoe@example.com", "password": "password"} )

    expect(stubCreate).toHaveBeenCalled()
    result.subscribe({
        next: (value) => {
            expect(value).toEqual('johndoe@example.com');
            done()
        }
    })



  });


  })


})