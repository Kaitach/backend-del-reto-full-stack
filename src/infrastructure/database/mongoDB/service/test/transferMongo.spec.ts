import { Test, TestingModule } from "@nestjs/testing";
import { ITransferRepository } from "../../repository";
import { TransferServiceMongo } from "../TransferMongo.service";
import { TransferDto } from "../../../../";

describe('TransferServiceMongo', () => {
    let service: TransferServiceMongo;
    let repository: ITransferRepository;
  
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            TransferServiceMongo,
          {
            provide: ITransferRepository,
            useValue: {
                createTransfer: jest.fn()
            },
          },
        ],
      }).compile();
  
      service = module.get<TransferServiceMongo>(TransferServiceMongo);
      repository = module.get<ITransferRepository>(ITransferRepository);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('registerTransfer', () => {
        it('should call recipieMongoRepository.registerDeposit ', () => {
    
             const data: TransferDto = {
                id: '2',
            amount: 123231,
            receiverAccountId: '123123',
            senderAccountId: '123123123',
          };
    
          service.createTransfer(data);
    
          expect(repository.createTransfer).toHaveBeenCalledWith(data);
        });
      }); 

});