import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { Deposit, DepositDocument } from '../../schemas';
import { IDepositRepository } from '../DepositRepository';
import { Observable, lastValueFrom, of } from 'rxjs';
import { DepositEntity } from '../../../../../domain';
import { ObjectId } from 'mongodb';

describe('ITransferRepository', () => {
  let repository: IDepositRepository;
  let documentModel: Model<DepositDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IDepositRepository,
        {
          provide: getModelToken(Deposit.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
            find: jest.fn(),
            getUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<IDepositRepository>(IDepositRepository);
    documentModel = module.get<Model<DepositDocument>>(
      getModelToken(Deposit.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('FindRecipeById', () => {
    it('should find a user by id and return it', async () => {
      const id = '123';
      const user = {
        accountId: '123',
        amount: 123,
        reason: 'test',
        userId: '1243',
      };

      jest.spyOn(documentModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      } as any);

      const result = await lastValueFrom(repository.getDepositById(id));

      expect(result).toEqual({
        accountId: '123',
        amount: 123,
        reason: 'test',
        userId: '1243',
      });
    });
    it('should throw an error if an error occurs while searching for recipes', async () => {
      const id = '123';

      jest.spyOn(documentModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(new Error('Database error')),
      } as any);

      await expect(
        lastValueFrom(repository.getDepositById(id)),
      ).rejects.toThrow('Error al buscar el deposito');
      expect(documentModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('deletdepositById', () => {
    it('should delete a user when the user is found', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;

      jest.spyOn(documentModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as unknown as Query<any, any>);

      // Act
      const result = await repository.deleteDepositById(id);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const user = new DepositEntity(id, 'Test User', 1, 'testpassword');

      const updatedUser = {} as DepositDocument;

      const expectedUser = new DepositEntity(
        id,
        'Test User',
        1,
        'testpassword',
      );
      const execMock = jest.fn().mockResolvedValueOnce(expectedUser);
      const findOneAndUpdateSpy = jest
        .spyOn(documentModel, 'findByIdAndUpdate')
        .mockReturnValueOnce({
          exec: execMock,
        } as unknown as Query<DepositDocument | null, DepositDocument>);

      // Act
      const result$ = repository.updateDeposit(id, user);

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
    const deposit = {
      accountId: '123',
      amount: 123,
      reason: 'test',
      userId: '1243',
    };
    const createddeposit = {
      accountId: '123',
      amount: 123,
      reason: 'test',
      userId: '1243',
    };
    const expecteddeposit = {
      accountId: '123',
      amount: 123,
      reason: 'test',
      userId: '1243',
    };
    jest
      .spyOn(documentModel, 'create')
      .mockReturnValue(of(createddeposit) as any);

    // Act
    const result$ = repository.createDeposit(deposit);

    // Assert
    expect(await lastValueFrom(result$)).toEqual(expecteddeposit);
  });

  describe('getAllDepositByUserId', () => {
    it('should return an array of DepositEntity', async () => {
      // Arrange
      const userId = '123';
      const depositDocuments = [
        {
          userId: userId,
          amount: 100,
          reason: 'Test',
          accountId: 'acc123',
        },
        {
          userId: userId,
          amount: 50,
          reason: 'Test 2',
          accountId: 'acc456',
        },
      ];
      const expectedDeposits = [
        {
          userId: userId,
          amount: 100,
          reason: 'Test',
          accountId: 'acc123',
        },
        {
          userId: userId,
          amount: 50,
          reason: 'Test 2',
          accountId: 'acc456',
        },
      ];
      const stubFind = jest.fn(
        () =>
          new Observable<DepositEntity[]>((subscriber) => {
            subscriber.next(depositDocuments);
            subscriber.complete();
          }),
      );
      jest
      .spyOn(documentModel, 'find')
      .mockReturnValue(stubFind() as any);
      
      // Act
      const result = await lastValueFrom(repository.getAllDepositByUserId(userId));
  
      // Assert
      expect(result).toEqual(expectedDeposits);
    });
  });
  
  
});
