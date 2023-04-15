import { TestingModule, Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { UserEntity, transferEntity } from '../../../domain';
import { AccountServiceMongo, IUserServiceMongo, LoginDto, TransferController, TransferDto, TransferServiceMongo } from '../../';
import { RegisterUserDto } from '../../';
import { UserController } from '../user.controller';

import * as delegate from '../../../application/delegate/transferDelegate';

jest.mock('../../../application/delegate/transferDelegate');

describe('TransferController', () => {
  let controller: TransferController;
  let transferService: TransferServiceMongo;
  let accountService: AccountServiceMongo;
  const id = '1';

  jest
    .spyOn(delegate, 'TransferDelegate')
    .mockReturnValue({} as any as delegate.TransferDelegate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        {
          provide: TransferServiceMongo,
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

    controller = module.get<TransferController>(TransferController);
    transferService = module.get<TransferServiceMongo>(TransferServiceMongo);
    accountService = module.get<AccountServiceMongo>(AccountServiceMongo);
  });



  describe('registerTransfer', () => {
    it('should call use case to create user and return the created user', (done) => {
    
        const transfer: TransferDto = {
        amount: 0,
        id: '2',
        receiverAccountId: '3',
        senderAccountId: '2'
            

          };
    

          const stubCreate = jest.fn((data: TransferDto) => {
            return new Observable<transferEntity>((subscriber) => {
              subscriber.next({ ...data } as transferEntity);
              subscriber.complete();
            });
          });
          
      const createdtransfer: TransferDto = {
        amount: 0,
        id: '2',
        receiverAccountId: '3',
        senderAccountId: '2',
      } ;
      
      (controller as any).useCase =
        {
          tocreateTransfer: jest.fn(),
          execute: stubCreate,
        };
    
    const result = controller.registerDeposit(transfer)

    expect(stubCreate).toHaveBeenCalledWith(transfer)
    result.subscribe({
        next: (value) => {
            expect(value).toEqual(createdtransfer);
            done()
        }
    })



  });







  }) 
  
}) 