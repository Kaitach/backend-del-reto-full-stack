import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { Account, AccountDocument } from "../../schemas";
import { IAccountRepository } from "../AccountRepository";
import { AccountEntity } from "../../../../../domain";
import { Observable, lastValueFrom, of } from "rxjs";
import { ObjectId } from 'mongodb';

describe('ITransferRepository', () => {
    let repository: IAccountRepository;
    let accountModel: Model<AccountDocument>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            IAccountRepository,
          {
            provide: getModelToken(Account.name),
            useValue: {
              create: jest.fn(),
              deleteOne: jest.fn(),
              findById: jest.fn(),
            },
          },
        ],
      }).compile();
  
      repository = module.get<IAccountRepository>(IAccountRepository);
      accountModel = module.get<Model<AccountDocument>>(getModelToken(Account.name));
    });
  
    it('should be defined', () => {
      expect(repository).toBeDefined();
    });


    

    describe('deletdepositById', () => {
        it('should delete a user when the user is found', async () => {
          const id = '641c70d41964e9445f593bcc';
          const expectedResponse = true;
    

          const stubFind = jest.fn(
            () =>
              new Observable<boolean>((subscriber) => {
                subscriber.next(expectedResponse);
                subscriber.complete();
              }),
          );
          jest
          .spyOn(repository, 'deleteAccountById')
          .mockReturnValue(stubFind() as any);
          
          jest.spyOn(accountModel, 'deleteOne').mockReturnValue({
            exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
          } as unknown as Query<any, any>);


    
          // Act
          const result = await repository.deleteAccountById(id);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expectedResponse);
        });
      });
    
      describe('updateUser', () => {
        it('should update an existing user', async () => {
          // Arrange
          const id = '641c70d41964e9445f593bcc';
          const user = new AccountEntity(15, 'Test User',  'testpassword');
    
          const updatedUser = {} as AccountDocument;
    
          const expectedUser = new AccountEntity(
            15, 'Test User',  'testpassword'
          );
          const execMock = jest.fn().mockResolvedValueOnce(expectedUser);

          const stubFind = jest.fn(
            () =>
              new Observable<AccountEntity>((subscriber) => {
                subscriber.next(expectedUser);
                subscriber.complete();
              }),
          );
          jest
          .spyOn(accountModel, 'findById')
          .mockReturnValue(stubFind() as any);

          const findOneAndUpdateSpy = jest
            .spyOn(accountModel, 'findById')
            .mockReturnValueOnce({
              exec: execMock,
            } as unknown as Query<AccountDocument | null, AccountDocument>);
    
          // Act
          const result$ = repository.updateAccount(user);
    
          // Assert
          result$.subscribe((user) => {
            expect(user).toEqual(expectedUser);
            expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
              { _id: new ObjectId(id) },
              updatedUser,
              { new: true },
            );
          });
        });
      });
    
      it('should create a new transfer', async () => {
        // Arrange
        const deposit:AccountEntity = {
        
            amount: 1,
            type: 'amount',
            userID: 'user',
            id: '12'

        };
        const createddeposit = {
            amount: 1,
            type: 'amount',
            userID: 'user',
            id: '12'
        };
        const expecteddeposit = {
            "amount": 0,
             "id": undefined,
             "type": "amount",
             "userID": "user",
        };
        jest
          .spyOn(accountModel, 'create')
          .mockReturnValue(of(createddeposit) as any);
    
        // Act
        const result$ = repository.createAccount(deposit);
    
        // Assert
        expect(await lastValueFrom(result$)).toEqual(expecteddeposit);
      });
});