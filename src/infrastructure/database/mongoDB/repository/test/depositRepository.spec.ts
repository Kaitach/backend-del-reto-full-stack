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

  
  

  
  describe('findById', () => {
    it('should return an find PublisherMongo', async () => {
  
      const userId = '641c70d41964e9445f593bcc';
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
      ] as DepositEntity[];
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
      jest
        .spyOn(documentModel, 'find')
        .mockResolvedValue(expectedDeposits as any);
  
  
      const result = repository.getAllDepositByUserId(userId);
  
  
      expect(documentModel.find).toHaveBeenCalledWith(
        {"userId": "641c70d41964e9445f593bcc"}
      );


    });
  
    describe('getAllDepositByUserId', () => {
      let repository: IDepositRepository;
      let depositModule: Model<DepositDocument>;
    
      beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
          providers: [
            IDepositRepository,
            {
              provide: getModelToken('Deposit'),
              useValue: {
                find: jest.fn(),
              },
            },
          ],
        }).compile();
    
        repository = moduleRef.get<IDepositRepository>(IDepositRepository);
        depositModule = moduleRef.get<Model<DepositDocument>>(getModelToken('Deposit'));
      });
    
      it('should return deposits for given userId', async () => {
        // Arrange
        const userId = '123';
        const expectedDeposits = [      {        userId: '123',        amount: 100,        reason: 'Test',        accountId: 'acc123',      },      {        userId: '123',        amount: 50,        reason: 'Test 2',        accountId: 'acc456',      },    ];
        const depositDocuments = [      {        toObject: jest.fn().mockReturnValue(expectedDeposits[0]),
          },
          {
            toObject: jest.fn().mockReturnValue(expectedDeposits[1]),
          },
        ];
        jest.spyOn(depositModule, 'find').mockResolvedValue(depositDocuments as any);
    
        // Act
        const result = await repository.getAllDepositByUserId(userId).toPromise();
    
        // Assert
        expect(depositModule.find).toHaveBeenCalledWith({ userId });
        expect(result).toEqual(expectedDeposits);
        expect(depositDocuments[0].toObject).toHaveBeenCalled();
        expect(depositDocuments[1].toObject).toHaveBeenCalled();
      });
    });
});

});

