import { TestingModule, Test } from "@nestjs/testing";
import { of, Observable } from "rxjs";
import { DepositEntity } from "src/domain";
import { IDepositRepository } from "../../repository";
import { DepositServiceMongo } from "../DepositMongo.service";

describe('DepositServiceMongo', () => {
    let service: DepositServiceMongo;
    let mockRepository: IDepositRepository;
  
    beforeEach(async () => {
      mockRepository = {
        createDeposit: jest.fn(),
        updateDeposit: jest.fn(),
        getDepositById: jest.fn(),
        deleteDepositById: jest.fn(),
        getAllDepositByUserId: jest.fn(),
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DepositServiceMongo,
          { provide: IDepositRepository, useValue: mockRepository },
        ],
      }).compile();
  
      service = module.get<DepositServiceMongo>(DepositServiceMongo);
    });
  
    describe('createDeposit', () => {
      it('should create a deposit', () => {
        // Arrange
        const deposit: DepositEntity = {
          amount: 100,
          userId: 'user123',
          date: new Date(),
        };
        const createdDeposit: DepositEntity = {
          ...deposit,
          id: 'deposit123',
        };
        mockRepository.createDeposit.mockReturnValue(of(createdDeposit));
  
        // Act
        const result: Observable<DepositEntity> = service.createDeposit(deposit);
  
        // Assert
        result.subscribe((depositResult) => {
          expect(depositResult).toEqual(createdDeposit);
          expect(mockRepository.createDeposit).toHaveBeenCalledWith(deposit);
        });
      });
    });
  
    describe('updateDeposit', () => {
      it('should update a deposit', () => {
        // Arrange
        const deposit: DepositEntity = {
          id: 'deposit123',
          amount: 100,
          userId: 'user123',
          date: new Date(),
        };
        const updatedDeposit: DepositEntity = {
          ...deposit,
          amount: 200,
        };
        mockRepository.updateDeposit.mockReturnValue(of(updatedDeposit));
  
        // Act
        const result: Observable<DepositEntity> = service.updateDeposit(
          'deposit123',
          updatedDeposit,
        );
  
        // Assert
        result.subscribe((depositResult) => {
          expect(depositResult).toEqual(updatedDeposit);
          expect(mockRepository.updateDeposit).toHaveBeenCalledWith(
            'deposit123',
            updatedDeposit,
          );
        });
      });
    });
  
    describe('getDepositById', () => {
      it('should return a deposit by id', () => {
        // Arrange
        const deposit = {
          amount: 100,
          userId: 'user123',
        };
        mockRepository.getDepositById.mockReturnValue(of(deposit));
  
        // Act
        const result: Observable<DepositEntity> = service.getDepositById(
          'deposit123',
        );
  
        // Assert
        result.subscribe((depositResult) => {
          expect(depositResult).toEqual(deposit);
          expect(mockRepository.getDepositById).toHaveBeenCalledWith('deposit123');
        });
      });
    });  });