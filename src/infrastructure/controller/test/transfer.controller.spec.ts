import { TestingModule, Test } from "@nestjs/testing";
import { of, Observable } from "rxjs";
import { TransferDelegate } from "../../../application/delegate/transferDelegate";
import { TransferServiceMongo, AccountServiceMongo, Transfer } from "../../../infrastructure/database";
import { TransferDto } from "../../../infrastructure/utils";
import { TransferController } from "../transfer.controller";
import { transferEntity } from "../../../domain";
import { jest } from '@jest/globals';

describe('TransferController', () => {
  let controller: TransferController;
  let transferDelegate: TransferDelegate;
  let transferService: TransferServiceMongo;
  let accountService: AccountServiceMongo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        TransferDelegate,
        {
          provide: TransferServiceMongo,
          useValue: {
            toCreateUser: jest.fn(),
            toCreateTransfer: jest.fn(),
            execute: jest.fn(),
          },
        },
        {
          provide: AccountServiceMongo,
          useValue: {getAccountById : jest.fn()},
        },
         
      ],
    }).compile();

    controller = module.get<TransferController>(TransferController);
    transferDelegate = module.get<TransferDelegate>(TransferDelegate);
    transferService = module.get<TransferServiceMongo>(TransferServiceMongo);
    accountService = module.get<AccountServiceMongo>(AccountServiceMongo);
  });

 
  it('should call use case toCreateTransfer', (done) => {
    // Arrange
    const body: TransferDto = { senderAccountId: 'pedro', receiverAccountId: '21', amount: 213, id: '1' };
    const stubCreate = jest.fn(
      (data: TransferDto) =>
        new Observable<transferEntity>((subscriber) => {
          subscriber.next({ ...data } as transferEntity);
          subscriber.complete();
        }),
    );
    const expectedData = { senderAccountId: 'pedro', receiverAccountId: '21', amount: 213, id: '1' } as transferEntity;
    (controller as any).useCase = {
      toCreateTransfer: stubCreate,
      execute: stubCreate,
    };
    const stubFind = jest.fn(
        () =>
          new Observable<transferEntity>((subscriber) => {
            subscriber.next(expectedData);
            subscriber.complete();
          }),
      );
      jest
      .spyOn(controller, 'registerDeposit')
      .mockReturnValue(stubFind() as any);
    // Act
    const result = controller.registerDeposit(body);
  
    // Assert
    expect((controller as any).useCase.toCreateTransfer).toHaveBeenCalledWith(body);
    result.subscribe({
        next: (value) => {
          expect(value).toEqual(expectedData);
          done();
        },
      });
  });
  
  });
