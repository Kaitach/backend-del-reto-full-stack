import { TestingModule, Test } from "@nestjs/testing";
import { of } from "rxjs";
import { DepositEntity } from "../../../../../domain";
import { IDepositRepository } from "../../repository";
import { DepositServiceMongo } from "../DepositMongo.service";

describe('DepositServiceMongo', () => {
  let service: DepositServiceMongo;
  let repository: IDepositRepository;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositServiceMongo,
        {
          provide: IDepositRepository,
          useValue: {
            createDeposit: jest.fn(),
            updateDeposit: jest.fn(),
            getDepositById: jest.fn(),
            deleteDepositById: jest.fn(),
            getAllDepositByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepositServiceMongo>(DepositServiceMongo);
    repository = module.get<IDepositRepository>(IDepositRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  

  describe('DeleteUser', () => {
    it('should call IUserrepository.deleteUserById', () => {
      const id = 'testid';

      repository.deleteDepositById((id));

      service.deleteDepositById(id);



      expect(repository.deleteDepositById).toHaveBeenCalledWith(id);
    });
  });



  describe('updateDeposit', () => {
    it('should call IUserrepository.update', () => {
      // ACT
      const id = 'testid';
      const data: DepositEntity = {
        amount: 123231,
        accountId: '123123',
        reason: 'test',
        userId: '123123',
      };

      const testdata = {
        amount: 123231,
        accountId: '123123',
        reason: 'test',
        userId: '123123',
      };

      // 
      repository.updateDeposit(id,testdata);

      service.updateDeposit(id, data)

      // 
      expect(repository.updateDeposit).toHaveBeenCalledWith(id, data);
    });
  });


  describe('registerDeposit', () => {
    it('should call recipieMongoRepository.registerDeposit ', () => {

         const data: DepositEntity = {
        amount: 123231,
        accountId: '123123',
        reason: 'test',
        userId: '123123',
      };

      service.createDeposit(data);

      expect(repository.createDeposit).toHaveBeenCalledWith(data);
    });
  }); 




    
  describe('FindAllDeposit', () => {
    it('should call recipieMongoRepository.FindAllRecipe', () => {
      const id = '123124124512';

      const deposits: DepositEntity[] = [
        {
          accountId: '123124124512',
          userId: id,
          amount: 100,
         reason: 'Deposit' 
        },
        {
          accountId: '123124124512',
          userId: id,
          amount: 100,
         reason: 'Deposit' 
        },
      ];



      const FindAllRecipeSpy = jest.spyOn(repository, 'getAllDepositByUserId');
      FindAllRecipeSpy.mockReturnValue(of(deposits));

      service.getAllDepositByUserId(id).subscribe((res) => {
        expect(res).toEqual(deposits);
      });

      expect(repository.getAllDepositByUserId).toHaveBeenCalled();
    });
  });

  describe('FindByIdDeposit', () => {
    it('should call repository.getDepositById', () => {
      const id = '123124124512';
  
      const deposit: DepositEntity = {
        accountId: '123124124512',
        userId: id,
        amount: 100,
        reason: 'Deposit'
      };
  
      const getDepositByIdSpy = jest.spyOn(repository, 'getDepositById');
      getDepositByIdSpy.mockReturnValue(of(deposit));
  
      service.getDepositById(id).subscribe((res) => {
        expect(res).toEqual(deposit);
      });
  
      expect(repository.getDepositById).toHaveBeenCalled();
    });
  });
  


});
