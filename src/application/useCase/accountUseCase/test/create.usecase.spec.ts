import { of } from "rxjs";
import { AccountService, UserService, AccountEntity, UserEntity } from "src/domain";
import { createAccountUseCase } from "../createAccount.UseCase";

describe('createNewAccount', () => {
  let useCase: createAccountUseCase;
  let repository: AccountService;
  let userService: UserService
  beforeEach(async () => {
    repository = {
      createAccount: jest.fn(),
    } as any as AccountService;

    userService = {
      getUserById: jest.fn(),
    updateUser: jest.fn(),
    } as any as UserService

    useCase = new createAccountUseCase(repository, userService);
  });

  it('should create a new account with an initial amount of 0', (done) => {
    const newAccount: AccountEntity = { userID: 'user-1' } as any;
    const createdAccount: AccountEntity = { id: 'account-1', ...newAccount, amount: 0 } as any;
    (repository.createAccount as jest.Mock).mockReturnValueOnce(of(createdAccount));

    useCase.createNewAccount(newAccount).subscribe((result) => {
      expect(result).toEqual(createdAccount);
      expect(repository.createAccount).toHaveBeenCalledWith({ userID: 'user-1', amount: 0 });
      done();
    });
  });
  describe('execute', () => {
    it('should create a new account, add it to user and return account', (done) => {
      const mockAccount: AccountEntity = {
        type: '',
        amount: 0,
        userID: '1',
      };
      const mockNewAccount = { id: '1', type: '', amount: 0, userID: '1' };
      const mockUser: UserEntity = { id: '1',   email: 'test@test.com', Account: [], document: 23 ,name :'test', password: '23123' };

      jest.spyOn(repository, 'createAccount').mockReturnValueOnce(of(mockNewAccount));
      jest.spyOn(userService, 'getUserById').mockReturnValueOnce(of(mockUser));
      jest.spyOn(userService, 'updateUser').mockReturnValueOnce(of(mockUser));

      useCase.execute(mockAccount).subscribe((result) => {
        expect(result).toEqual({ ...mockAccount, id: '1' });
        expect(repository.createAccount).toHaveBeenCalledTimes(1);
        expect(userService.getUserById).toHaveBeenCalledTimes(1);
        expect(userService.updateUser).toHaveBeenCalledTimes(1);
        done();
      });
    });
});




    it('should return null when accountID is not provided', (done) => {
      const mockAccount: AccountEntity = {
        type: '',
        amount: 0,
        userID: '1',
      };

      jest.spyOn(userService, 'getUserById').mockReturnValueOnce(of({ id: '1',   email: 'test@test.com', Account: [], document: 23 ,name :'test', password: '23123' }));

      useCase.addAccountToUser(null, mockAccount.userID).subscribe((result) => {
        expect(result).toEqual(null);
        expect(userService.getUserById).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
