import { of } from "rxjs";
import { DeleteDepositUseCase, createDepositUseCase, FindByIdDepositUseCase, UpdateDepositUseCase, FindAllDeposittUseCase } from "../../../application/useCase";
import { AccountService } from "../../../domain";
import { DepositSertivce } from "../../../domain/service/deposit-domain.service";
import { DepositDelegate } from "../depositDelegate";


describe('DepositDelegate', () => {
  let depositDelegate: DepositDelegate;
  let depositServiceMock: DepositSertivce;
  let accountServiceMock: AccountService;

  beforeEach(() => {
    depositServiceMock = {} as DepositSertivce;
    accountServiceMock = {} as AccountService;
    depositDelegate = new DepositDelegate(accountServiceMock, depositServiceMock);
  });

  describe('toDeleteDeposit', () => {
    it('should set the delegate to DeleteDepositUseCase', () => {
      // Arrange

      // Act
      depositDelegate.toDeleteDeposit();

      // Assert
      expect(depositDelegate['delegate']).toBeInstanceOf(DeleteDepositUseCase);
    });
  });

  describe('toCreateDeposit', () => {
    it('should set the delegate to createDepositUseCase', () => {
      // Arrange

      // Act
      depositDelegate.toCreateDeposit();

      // Assert
      expect(depositDelegate['delegate']).toBeInstanceOf(createDepositUseCase);
    });
  });

  describe('findById', () => {
    it('should set the delegate to FindByIdDepositUseCase', () => {
      // Arrange

      // Act
      depositDelegate.findById();

      // Assert
      expect(depositDelegate['delegate']).toBeInstanceOf(FindByIdDepositUseCase);
    });
  });

  describe('updateDeposit', () => {
    it('should set the delegate to UpdateDepositUseCase', () => {
      // Arrange

      // Act
      depositDelegate.updateDeposit();

      // Assert
      expect(depositDelegate['delegate']).toBeInstanceOf(UpdateDepositUseCase);
    });
  });

  describe('getAllUsersDeposit', () => {
    it('should set the delegate to FindAllDeposittUseCase', () => {
      // Arrange

      // Act
      depositDelegate.getAllUsersDeposit();

      // Assert
      expect(depositDelegate['delegate']).toBeInstanceOf(FindAllDeposittUseCase);
    });
  });


  
  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      depositDelegate['delegate'] = delegateMock;

      // Act
      const result$ = depositDelegate.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });
});
