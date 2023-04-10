import { Observable, of } from "rxjs";
import { createTransferUseCase } from "../../../application/useCase";
import { AccountService } from "../../../domain";
import { TransferService } from "../../../domain/service/transer-domain.service";
import { TransferDelegate } from "../transferDelegate";

describe('TransferDelegate', () => {
  let transferDelegate: TransferDelegate;
  let transferServiceMock: TransferService;
  let accountServiceMock: AccountService;

  beforeEach(() => {
    transferServiceMock = {} as TransferService;
    accountServiceMock = {} as AccountService;
    transferDelegate = new TransferDelegate(transferServiceMock, accountServiceMock);
  });

  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      transferDelegate['delegate'] = delegateMock;

      // Act
      const result$ = transferDelegate.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });

  describe('tocreateTransfer', () => {
    it('should set delegate to an instance of createTransferUseCase', () => {
      // Act
      transferDelegate.tocreateTransfer();

      // Assert
      expect(transferDelegate['delegate']).toBeInstanceOf(createTransferUseCase);
    });
  });
});
