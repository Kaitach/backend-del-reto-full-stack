import { Test, TestingModule } from "@nestjs/testing";
;
import { AccountServiceMongo, IAccountRepository, TransferDto } from "../../../../";
import { AccountEntity } from "../../../../../domain";
import { of } from "rxjs";

describe('TransferServiceMongo', () => {
    let service: AccountServiceMongo;
    let repository: IAccountRepository;
  
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            AccountServiceMongo,
          {
            provide: IAccountRepository,
            useValue: {
                createAccount: jest.fn(),
                updateAccount: jest.fn(),
                getAccountById: jest.fn(),
                deleteAccountById: jest.fn(),
                getAllAccountsByUserId: jest.fn(),
            },
          },
        ],
      }).compile();
  
      service = module.get<AccountServiceMongo>(AccountServiceMongo);
      repository = module.get<IAccountRepository>(IAccountRepository);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('registerTransfer', () => {
        it('should call recipieMongoRepository.registerDeposit ', () => {
    
             const data: AccountEntity = {
                id: '2',
            amount: 123231,
            userID: '123123',
            type: 'test',
          };
    
          service.createAccount(data);
    
          expect(repository.createAccount).toHaveBeenCalledWith(data);
        });
      }); 


      describe('updateUSer', () => {
        it('should call IUserrepository.update', () => {
          // ACT
          const id = 'testid';
          const data: AccountEntity = {
            id: '2',
        amount: 123231,
        userID: '123123',
        type: 'test',
          };
    
          const testdata = {
            id: '2',
            amount: 123231,
            userID: '123123',
            type: 'test',
          };
    
          // 
          repository.updateAccount(testdata);
    
          service.updateAccount(id, data)
    
          // 
          expect(repository.updateAccount).toHaveBeenCalledWith( data);
        });
      });

      describe('FindByIdUser', () => {
        it('should call repository.getDepositById', () => {
          const id = '123124124512';
    
          const data: AccountEntity = {
            id: '2',
        amount: 123231,
        userID: '123123',
        type: 'test',
          };
    
          const getDepositByIdSpy = jest.spyOn(repository, 'getAccountById');
          getDepositByIdSpy.mockReturnValue(of(data));
    
          service.getAccountById(id).subscribe((res) => {
            expect(res).toEqual(data);
          });
    
          expect(repository.getAccountById).toHaveBeenCalled();
        });
      });
     describe('DeleteUser', () => {
        it('should call IUserrepository.deleteUserById', () => {
          const id = 'testid';
    
          repository.deleteAccountById((id));
    
          service.deleteAccountById(id);
    
    
    
          expect(repository.deleteAccountById).toHaveBeenCalledWith(id);
        });
      });



      describe('FindAllDeposit', () => {
        it('should call recipieMongoRepository.FindAllRecipe', () => {
          const id = '123124124512';
    
          const deposits: AccountEntity[] = [
            {
                id: '2',
                amount: 123231,
                userID: '123123',
                type: 'test',
            },
            {
                id: '3',
                amount: 123231,
                userID: '123123',
                type: 'test',
            },
          ];
    
    
    
   
});})})