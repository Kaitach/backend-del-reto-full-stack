import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { of, lastValueFrom } from "rxjs";
import { TransferDto } from "../../../../";
import { TransferDocument, Transfer } from "../../schemas";
import { ITransferRepository } from "../TransferRepository";


describe('ITransferRepository', () => {
  let repository: ITransferRepository;
  let transferModel: Model<TransferDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ITransferRepository,
        {
          provide: getModelToken(Transfer.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ITransferRepository>(ITransferRepository);
    transferModel = module.get<Model<TransferDocument>>(getModelToken(Transfer.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
 
  it('should create a new transfer', async () => {
    // Arrange
    const transfer = {
        id: "1",
        senderAccountId: '123456789',
      receiverAccountId: '987654321',
      amount: 100,
    };
    const createdTransfer = {
      id: '641c70d41964e9445f593bcc',
      senderAccountId: '123456789',
      receiverAccountId: '987654321',
      amount: 100,
    };
    const expectedTransfer = {
      id: '641c70d41964e9445f593bcc',
      senderAccountId: '123456789',
      receiverAccountId: '987654321',
      amount: 100,
    };
    jest.spyOn(transferModel, 'create').mockReturnValue(of(createdTransfer) as any);

    // Act
    const result$ = repository.createTransfer(transfer);

    // Assert
    expect(await lastValueFrom(result$)).toEqual(expectedTransfer);
  });
  
  
});
