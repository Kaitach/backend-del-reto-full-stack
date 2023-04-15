import { TestingModule, Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { DepositEntity, UserEntity, transferEntity } from '../../../domain';
import { AccountServiceMongo, DepositController, DepositDto, DepositServiceMongo, IUserServiceMongo, LoginDto, TransferController, TransferDto, TransferServiceMongo } from '../../';
import { RegisterUserDto } from '../../';
import { UserController } from '../user.controller';

import * as delegate from '../../../application/delegate/depositDelegate';

jest.mock('../../../application/delegate/depositDelegate');

describe('DepositController', () => {
  let controller: DepositController;
  let depositService: DepositServiceMongo;
  let accountService: AccountServiceMongo;
  const id = '1';

  jest
    .spyOn(delegate, 'DepositDelegate')
    .mockReturnValue({} as any as delegate.DepositDelegate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositController],
      providers: [
        {
          provide: DepositServiceMongo,
          useValue: {
            
          },
        },
        {
          provide: AccountServiceMongo,
          useValue: {
            
          },
        },
      ],
    }).compile();

    controller = module.get<DepositController>(DepositController);
    depositService = module.get<DepositServiceMongo>(DepositServiceMongo);
    accountService = module.get<AccountServiceMongo>(AccountServiceMongo);
  });



  describe('registerTransfer', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const deposit: DepositDto = {
        amount: 0,
        id: '2',
       accountId: 'account',
       reason: 'test',
       userId: '24'
            

          };
    

          const stubCreate = jest.fn((data: DepositDto) => {
            return new Observable<DepositEntity>((subscriber) => {
              subscriber.next({ ...data } as DepositEntity);
              subscriber.complete();
            });
          });
          
      const createdDeposit: DepositDto = {
        amount: 0,
        id: '2',
       accountId: 'account',
       reason: 'test',
       userId: '24'
      } ;
      
      (controller as any).useCase =
        {
            toCreateDeposit: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.registerDeposit(deposit)

    expect(stubCreate).toHaveBeenCalledWith(deposit)
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdDeposit);
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
            toDeleteDeposit: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.deleteDeposit(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
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
    
    const result = controller.getaccountByID(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
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
            getAllUsersDeposit: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.getallDepositByID(user.id )

    expect(stubCreate).toHaveBeenCalledWith(user.id )
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
    
        const user: DepositEntity = {
            accountId: '123',
        amount: 100,
        reason: 'This is',
        userId: '1'
            

          };
    

          const stubCreate = jest.fn((userId: string, data: DepositEntity) => {
            return new Observable<DepositEntity>((subscriber) => {
              subscriber.next({...data});
              subscriber.complete();
            });
          });
          
      const createdUser: DepositEntity = {
        accountId: '123',
        amount: 100,
        reason: 'This is',
        userId: '1'
         

       };
      
      (controller as any).useCase =
        {
            updateDeposit: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.updateDeposit(user.userId, user )

    expect(stubCreate).toHaveBeenCalledWith(user.userId, user )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })

}) 