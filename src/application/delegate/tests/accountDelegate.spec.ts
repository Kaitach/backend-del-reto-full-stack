
import { createAccountUseCase } from "../../../application/useCase/accountUseCase/createAccount.UseCase";
import { FindAllAccountUseCase } from "../../../application/useCase/accountUseCase/findAllUserAccount.UseCase";
import { FindByIdAccountUseCase } from "../../../application/useCase/accountUseCase/findById.useCAse";
import { UpdateAccountUseCase } from "../../../application/useCase/accountUseCase/updateAccount.UseCase";
import { DeleteAccountUseCase,  } from "../../../application/useCase/accountUseCase/deleteAccount.UseCase";
import { AccountService, UserService } from "../../../domain";
import { AccountDelegate } from "../accountDelegate";
import { of } from "rxjs";


describe('AccountDelegate', () => {
  let accountDelegate: AccountDelegate;
  let accountServiceMock: AccountService;
  let userServiceMock: UserService;

  beforeEach(() => {
    accountServiceMock = {} as AccountService;
    userServiceMock = {} as UserService;
    accountDelegate = new AccountDelegate(accountServiceMock, userServiceMock);
  });

  describe('toDeleteaccount', () => {
    it('should set the delegate to DeleteAccountUseCase', () => {
      // Arrange

      // Act
      accountDelegate.toDeleteaccount();

      // Assert
      expect(accountDelegate['delegate']).toBeInstanceOf(DeleteAccountUseCase);
    });
  });

  describe('toCreateaccount', () => {
    it('should set the delegate to createAccountUseCase', () => {
      // Arrange

      // Act
      accountDelegate.toCreateaccount();

      // Assert
      expect(accountDelegate['delegate']).toBeInstanceOf(createAccountUseCase);
    });
  });

  describe('findById', () => {
    it('should set the delegate to FindByIdAccountUseCase', () => {
      // Arrange

      // Act
      accountDelegate.findById();

      // Assert
      expect(accountDelegate['delegate']).toBeInstanceOf(FindByIdAccountUseCase);
    });
  });

  describe('updateAccount', () => {
    it('should set the delegate to UpdateAccountUseCase', () => {
      // Arrange

      // Act
      accountDelegate.updateAccount();

      // Assert
      expect(accountDelegate['delegate']).toBeInstanceOf(UpdateAccountUseCase);
    });
  });

  describe('getAllUsersAccount', () => {
    it('should set the delegate to FindAllAccountUseCase', () => {
      // Arrange

      // Act
      accountDelegate.getAllUsersAccount();

      // Assert
      expect(accountDelegate['delegate']).toBeInstanceOf(FindAllAccountUseCase);
    });
  });





  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      accountDelegate['delegate'] = delegateMock;

      // Act
      const result$ = accountDelegate.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });
});
