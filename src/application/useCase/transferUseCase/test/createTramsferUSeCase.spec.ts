import { Observable, of } from "rxjs";
import { AccountEntity, AccountService, transferEntity } from "../../../..//domain";
import { TransferService } from "../../../../domain/service/transer-domain.service";
import { createTransferUseCase } from "../createTransferUseCase";

describe('createTransferUseCase', () => {
  let useCase: createTransferUseCase;
  let repository: TransferService;
  let accountService: AccountService;

  beforeEach(() => {
    repository = {
      createTransfer: jest.fn(),
    } as any as TransferService;
    accountService = {
      getAccountById: jest.fn(),
      updateAccount: jest.fn(),
    } as any as AccountService;
    useCase = new createTransferUseCase(accountService, repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a transfer between accounts', (done) => {
    const mockTransfer: transferEntity = {
      senderAccountId: 'senderAccountId',
      receiverAccountId: 'receiverAccountId',
      amount: 1,
      id: 'transferId',
    };
    const mockSenderAccount: AccountEntity = {
        id: 'senderAccountId',
        amount: 1,
        type: "",
        userID: ""
    }  ;
    const mockReceiverAccount = {
      id: 'receiverAccountId',
      amount: 200,
      type: "",
      userID: ""
    };
    const mockUpdatedSenderAccount = {
      id: 'senderAccountId',
      amount: 0,
      type: "",
      userID: "" 
    };
    const mockUpdatedReceiverAccount = {
      id: 'receiverAccountId',
      amount: 201,
      type: "",
      userID: "" 
    };
    const mockCreatedTransfer = {
      ...mockTransfer,
      createdAt: new Date(),
    };
  
    const account: AccountEntity = {
        type: "",
        amount: 0,
        userID: ""
    }
  
    jest.spyOn(accountService, 'getAccountById')
      .mockReturnValueOnce(of(mockSenderAccount))
      .mockReturnValueOnce(of(mockReceiverAccount));
    jest.spyOn(accountService, 'updateAccount')
      .mockReturnValueOnce(of(mockUpdatedSenderAccount))
      .mockReturnValueOnce(of(mockUpdatedReceiverAccount));
    jest.spyOn(repository, 'createTransfer')
      .mockReturnValueOnce(of(mockCreatedTransfer));
  
    useCase.execute(mockTransfer).subscribe((result) => {
      expect(result).toEqual(mockCreatedTransfer);
      expect(accountService.getAccountById).toHaveBeenCalledTimes(2);
      expect(accountService.getAccountById).toHaveBeenCalledWith('senderAccountId');
      expect(accountService.getAccountById).toHaveBeenCalledWith('receiverAccountId');
      expect(accountService.updateAccount).toHaveBeenCalledTimes(2);
      expect(accountService.updateAccount).toHaveBeenCalledWith('senderAccountId', mockUpdatedSenderAccount);
      expect(accountService.updateAccount).toHaveBeenCalledWith('receiverAccountId', mockUpdatedReceiverAccount);
      expect(repository.createTransfer).toHaveBeenCalledTimes(1);
      expect(repository.createTransfer).toHaveBeenCalledWith(mockTransfer);
      done();
    });
  });
  
  it('should throw an error if the sender account does not have enough money', (done) => {
    const mockTransfer: transferEntity = {
      senderAccountId: 'senderAccountId',
      receiverAccountId: 'receiverAccountId',
      amount: 100,
      id: 'transferId',
    };
    const mockSenderAccount = {
      id: 'senderAccountId',
      amount: 50,
    };
    const mockReceiverAccount = {
      id: 'receiverAccountId',
      amount: 200,
    };
    const account: AccountEntity = {
        type: "",
        amount: 0,
        userID: ""
    }
    jest.spyOn(accountService, 'getAccountById')
      .mockReturnValueOnce(of(account))
      .mockReturnValueOnce(of(account));

    useCase.execute(mockTransfer).subscribe({
      error: (err) => {
        expect(err.message).toEqual("The sender account doesn't have enough money");
        done();
      }
    });
}) 
})
