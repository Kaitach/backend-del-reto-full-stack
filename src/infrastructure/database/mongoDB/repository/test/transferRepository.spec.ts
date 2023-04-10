import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { of, lastValueFrom } from "rxjs";
import { TransferDto } from "../../../../utils/DTOS/TransferDto"
import { TransferDocument, Transfer } from "../../schemas";
import { ITransferRepository } from "../TransferRepository";

describe('ITransferRepository', () => {
  let transferRepository: ITransferRepository;
  let model: Model<TransferDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ITransferRepository,
        {
          provide: getModelToken(Transfer.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();
    transferRepository = module.get<ITransferRepository>(ITransferRepository);
    model = module.get<Model<TransferDocument>>(getModelToken(Transfer.name));
  });

  it('should be defined', () => {
    expect(transferRepository).toBeDefined();
  });

  describe('createTransfer', () => {
    it('should create a new transfer', async () => {
      // Arrange
      const transferDto = new TransferDto();
      transferDto.senderAccountId = 'senderId';
      transferDto.receiverAccountId = 'receiverId';
      transferDto.amount = 100;
      transferDto.id = 'transferId';

      const createTransfer = {
        _id: '641c70d41964e9445f593bcc',
        senderAccountId: 'senderId',
        receiverAccountId: 'receiverId',
        amount: 100,
        id: 'transferId',
      };

      const expectedTransfer = {
        _id: '641c70d41964e9445f593bcc',
        senderAccountId: 'senderId',
        receiverAccountId: 'receiverId',
        amount: 100,
        id: 'transferId',
      };

      jest.spyOn(model, 'create').mockReturnValue(of(createTransfer) as any);

      // Act
      const result = transferRepository.createTransfer(transferDto);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedTransfer);
    });
  });
});
