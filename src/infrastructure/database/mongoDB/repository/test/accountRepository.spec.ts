import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { Account, AccountDocument } from '../../schemas';
import { IAccountRepository } from '../AccountRepository';
import { AccountEntity } from '../../../../../domain';
import { Observable, lastValueFrom, of } from 'rxjs';
import { ObjectId } from 'mongodb';
import { HttpException, NotFoundException } from '@nestjs/common';

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
            findOneAndUpdate: jest.fn()
          },
        },
      ],
    }).compile();

    repository = module.get<IAccountRepository>(IAccountRepository);
    accountModel = module.get<Model<AccountDocument>>(
      getModelToken(Account.name),
    );
  });

  describe('deletdepositById', () => {
    it('should delete a user when the user is found', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;

      const stubFind = jest.fn(() => of(expectedResponse));
      jest.spyOn(repository, 'deleteAccountById').mockReturnValue(stubFind() as any);
      
      jest.spyOn(accountModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as unknown as Query<any, any>);

   

      // Act
      const result = await repository.deleteAccountById(id);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });
  });



  describe('deleteUserById', () => {
    it('should delete a user when the user is found', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;
  
      jest.spyOn(accountModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 })
      } as unknown as Query<any, any>);
  
      // Act
      const result = await repository.deleteAccountById(id);
  
      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });
  
  

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      // Arrange
      const PublisherMongo = {
        id: '641c70d41964e9445f593bcc',

        type: 'string',

        amount: 0,

        userID: '641c70d41964e9445f593bcc',
      };
      const mockPublisherMongo = {
        id: '641c70d41964e9445f593bcc',

        type: 'string',

        amount: 0,

        userID: '641c70d41964e9445f593bcc',
      };
      const expectedPublisherMongo = {
        id: '641c70d41964e9445f593bcc',

        type: 'string',

        amount: 0,

        userID: '641c70d41964e9445f593bcc',
      };
      const execMock = jest.fn().mockResolvedValueOnce(expectedPublisherMongo);
      const findOneAndUpdateSpy = jest
        .spyOn(accountModel, 'findOneAndUpdate')
        .mockReturnValueOnce({
          exec: execMock,
        } as unknown as Query<AccountDocument | null, AccountDocument>);

      // Act
      const result$ = repository.updateAccount(PublisherMongo);

      // Assert
      result$.subscribe((user) => {
        expect(user).toEqual(expectedPublisherMongo);
        expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
          { _id: new ObjectId(PublisherMongo.id) },
          mockPublisherMongo,
          { new: true },
        );
      });
    });
  });





  it('should create a new transfer', async () => {
    // Arrange
    const deposit: AccountEntity = {
      amount: 1,
      type: 'amount',
      userID: 'user',
      id: '12',
    };
    const createddeposit = {
      amount: 1,
      type: 'amount',
      userID: 'user',
      id: '12',
    };
    const expecteddeposit = {
      amount: 0,
      id: undefined,
      type: 'amount',
      userID: 'user',
    };
    jest
      .spyOn(accountModel, 'create')
      .mockReturnValue(of(createddeposit) as any);

    // Act
    const result$ = repository.createAccount(deposit);

    // Assert
    expect(await lastValueFrom(result$)).toEqual(expecteddeposit);
  });










  describe('findById', () => {
    it('should return an find PublisherMongo', async () => {
  
      const id = '641c70d41964e9445f593bcc';
      const deposit: AccountEntity = {
        amount: 1,
        type: 'amount',
        userID: 'user',
        id: '12',
      };
      const createddeposit = {
        amount: 1,
        type: 'amount',
        userID: 'user',
        id: '12',
      };
      const expecteddeposit = {
        $set: {
          amount: 0,
          id: '641c70d41964e9445f593bcc',
          type: 'string',
          userID: '641c70d41964e9445f593bcc',
        },
      };
      jest
        .spyOn(accountModel, 'findById')
        .mockResolvedValue(expecteddeposit as any);
  
  
      const result = repository.getAccountById(id);
  
  
      expect(accountModel.findById).toHaveBeenCalledWith(
        '641c70d41964e9445f593bcc'
      );


    });
  
    it('should return an account if user exists', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedDeposit = {
        amount: 0,
        id,
        type: 'string',
        userID: '641c70d41964e9445f593bcc',
      };
      jest.spyOn(accountModel, 'findById').mockResolvedValue(expectedDeposit as any);
    
      const result = await repository.getAccountById(id).toPromise();
    
      expect(accountModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(new AccountEntity(expectedDeposit.amount, expectedDeposit.id, expectedDeposit.type, expectedDeposit.userID));
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const id = '641c70d41964e9445f593bcc';
      jest.spyOn(accountModel, 'findById').mockResolvedValue(null);
    
      await expect(repository.getAccountById(id).toPromise()).rejects.toThrow(HttpException);
    
      expect(accountModel.findById).toHaveBeenCalledWith(id);
    });

  });
 
  
  
  

});

})