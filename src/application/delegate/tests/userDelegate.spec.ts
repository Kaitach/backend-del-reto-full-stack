import { of } from "rxjs";
import { DeleteUserUseCase, RegisterUserUseCase, LoginUseCase, findByEmailUseCase, finByIdUseCase, UpdateUserUseCase, getAllUserCase } from "../../../application/useCase";
import { UserService } from "../../../domain";
import { UserDelegate } from "../userDelegate";


describe('UserDelegate', () => {
  let delegator: UserDelegate;
  let service: UserService;

  beforeEach(() => {
    // Arrange
    service = {} as UserService;

    // Act
    delegator = new UserDelegate(service);
  });

  describe('toDeleteUser', () => {
    it('should set delegate to an instance of DeleteUserUseCase', () => {
      // Act
      delegator.toDeleteUser();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(DeleteUserUseCase);
    });
  });

  describe('toCreateUser', () => {
    it('should set delegate to an instance of RegisterUserUseCase', () => {
      // Act
      delegator.toCreateUser();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(RegisterUserUseCase);
    });
  });

  describe('loginUser', () => {
    it('should set delegate to an instance of LoginUseCase', () => {
      // Act
      delegator.loginUser();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(LoginUseCase);
    });
  });

  describe('findByEmail', () => {
    it('should set delegate to an instance of findByEmailUseCase', () => {
      // Act
      delegator.findByEmail();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(findByEmailUseCase);
    });
  });

  describe('findById', () => {
    it('should set delegate to an instance of finByIdUseCase', () => {
      // Act
      delegator.findById();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(finByIdUseCase);
    });
  });

  describe('updateUser', () => {
    it('should set delegate to an instance of UpdateUserUseCase', () => {
      // Act
      delegator.updateUser();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(UpdateUserUseCase);
    });
  });



  
  describe('getAll', () => {
    it('should set delegate to an instance of GetAllUser', () => {
      // Act
      delegator.getAllUsers();

      // Assert
      expect(delegator['delegate']).toBeInstanceOf(getAllUserCase);
    });
  });


  describe('execute', () => {
    it('should call the execute method of the delegate with the provided arguments', () => {
      // Arrange
      const expectedResponse = { foo: 'bar' };
      const delegateMock = {
        execute: jest.fn().mockReturnValue(of(expectedResponse))
      };
      delegator['delegate'] = delegateMock;

      // Act
      const result$ = delegator.execute('arg1', 'arg2');

      // Assert
      expect(delegateMock.execute).toHaveBeenCalledWith('arg1', 'arg2');
      result$.subscribe((result) => {
        expect(result).toEqual(expectedResponse);
      });
    });
  });
})
