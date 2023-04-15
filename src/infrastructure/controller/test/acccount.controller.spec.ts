import { TestingModule, Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { AccountEntity, DepositEntity, UserEntity, transferEntity } from '../../../domain';
import { AccountController, AccountDto, AccountServiceMongo, DepositController, DepositDto, DepositServiceMongo, IUserServiceMongo, LoginDto, TransferController, TransferDto, TransferServiceMongo } from '../../';
import { RegisterUserDto } from '../../';
import { UserController } from '../user.controller';

import * as delegate from '../../../application/delegate/accountDelegate';

jest.mock('../../../application/delegate/accountDelegate');

describe('AccountController', () => {
  let controller: AccountController;
  let userService: IUserServiceMongo;
  let accountService: AccountServiceMongo;
  const id = '1';

  jest
    .spyOn(delegate, 'AccountDelegate')
    .mockReturnValue({} as any as delegate.AccountDelegate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: IUserServiceMongo,
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

    controller = module.get<AccountController>(AccountController);
    userService = module.get<IUserServiceMongo>(IUserServiceMongo);
    accountService = module.get<AccountServiceMongo>(AccountServiceMongo);
  });



  describe('registerTransfer', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const Account: AccountDto = {
        amount: 0,
        id: '2',
        type: 'user',
        userID: '2'
            

          };
    

          const stubCreate = jest.fn((data: AccountDto) => {
            return new Observable<AccountEntity>((subscriber) => {
              subscriber.next({ ...data } as AccountEntity);
              subscriber.complete();
            });
          });
          
      const createdAccount: AccountDto = {
        amount: 0,
        id: '2',
        type: 'user',
        userID: '2'
            

          };
      
      (controller as any).useCase =
        {
            toCreateaccount: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.registerAccount(Account)

    expect(stubCreate).toHaveBeenCalledWith(Account)
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdAccount);
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
            toDeleteaccount: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.deleteaccount(user.id )

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


  describe('updaterUser', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const Account: AccountDto = {
            amount: 0,
            id: '2',
            type: 'user',
            userID: '2'
                
    
              };
          
    

          const stubCreate = jest.fn((userId: string, data: DepositEntity) => {
            return new Observable<DepositEntity>((subscriber) => {
              subscriber.next({...data});
              subscriber.complete();
            });
          });
          
      const createdUser: AccountDto = {
        amount: 0,
        id: '2',
        type: 'user',
        userID: '2'
            

          };
      
      (controller as any).useCase =
        {
            updateAccount: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.updateUser(Account.id, Account )

    expect(stubCreate).toHaveBeenCalledWith(Account.id, Account  )
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdUser);
            done()
        }
    })



  });


  })

}) 