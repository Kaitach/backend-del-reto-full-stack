
import { of } from "rxjs";
import { AccountService, DepositEntity } from "src/domain";
import { DepositSertivce } from "src/domain/service/deposit-domain.service";
import { createDepositUseCase } from "../createDeposit.UseCase";

describe('createDepositUseCase', () => {
  let useCase: createDepositUseCase;
  let depositService: DepositSertivce;
  let accountService: AccountService;

  beforeEach(() => {
    depositService = {
        createDeposit: jest.fn().mockReturnValue(of({ accountId: 'accountId', amount: 100,  reason: '2',
        userId:'23213' })),
    } as any as DepositSertivce;

    accountService = {
      getAccountById: jest.fn().mockReturnValue(of({ id: 'accountId', amount: 0 ,  reason: '2',
      userId:'23213'})),
      updateAccount: jest.fn().mockReturnValue(of({ id: 'accountId', amount: 100, reason: '2',
      userId:'23213' })),
    } as any as AccountService;

    useCase = new createDepositUseCase(accountService, depositService);
  });

  it('should create a deposit and update the account', (done) => {
    const mockDeposit: DepositEntity = {
      accountId: 'accountId',
      amount: 100,
      reason: '2',
      userId:'23213'
    };

    useCase.execute(mockDeposit).subscribe((result) => {
      expect(result).toEqual(mockDeposit);
      expect(depositService.createDeposit).toHaveBeenCalledTimes(1);
      expect(depositService.createDeposit).toHaveBeenCalledWith(mockDeposit);
      expect(accountService.getAccountById).toHaveBeenCalledTimes(1);
      expect(accountService.getAccountById).toHaveBeenCalledWith('accountId');
      expect(accountService.updateAccount).toHaveBeenCalledTimes(1);
      expect(accountService.updateAccount).toHaveBeenCalledWith('accountId', { id: 'accountId', amount: 100, reason: '2',
      userId:'23213' });
      done();
    });
  });
});
