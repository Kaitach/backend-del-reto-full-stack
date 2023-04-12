import { Test, TestingModule } from '@nestjs/testing';
import { IUserrepository } from '../../repository';
import { IUserServiceMongo, LoginDto, RegisterUserDto } from '../../../../';
import { of } from 'rxjs';
import { UserEntity } from '../../../../../domain';

describe('USerServiceMongo', () => {
  let service: IUserServiceMongo;
  let repository: IUserrepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IUserServiceMongo,
        {
          provide: IUserrepository,
          useValue: {
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            getUserById: jest.fn(),
            deleteUserById: jest.fn(),
            getAllUsers: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IUserServiceMongo>(IUserServiceMongo);
    repository = module.get<IUserrepository>(IUserrepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUserr', () => {
    it('should call recipieMongoRepository.registerDeposit ', () => {
      const data: RegisterUserDto = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
      };

      service.createUser(data);

      expect(repository.createUser).toHaveBeenCalledWith(data);
    });
  });

  describe('FindByIdUser', () => {
    it('should call repository.getDepositById', () => {
      const id = '123124124512';

      const data: UserEntity = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
        Account: [],
        id: '123124124512',
      };

      const getDepositByIdSpy = jest.spyOn(repository, 'getUserById');
      getDepositByIdSpy.mockReturnValue(of(data));

      service.getUserById(id).subscribe((res) => {
        expect(res).toEqual(data);
      });

      expect(repository.getUserById).toHaveBeenCalled();
    });
  });

  describe('FindByEmailUser', () => {
    it('should call repository.getDepositById', () => {
      const email = 'franco.torres@gmail.com';

      const data: UserEntity = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
        Account: [],
        id: '123124124512',
      };

      const getDepositByIdSpy = jest.spyOn(repository, 'getUserByEmail');
      getDepositByIdSpy.mockReturnValue(of(data));

      service.getUserByemail(email).subscribe((res) => {
        expect(res).toEqual(data);
      });

      expect(repository.getUserByEmail).toHaveBeenCalled();
    });
  });

  describe('updateUSer', () => {
    it('should call IUserrepository.update', () => {
      // ACT
      const id = 'testid';
      const data: UserEntity = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
        Account: [],
        id: '123124124512',
      };

      const testdata = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
        Account: [],
        id: '123124124512',
      };

      // 
      repository.updateUser(id,testdata);

      service.updateUser(id, data)

      // 
      expect(repository.updateUser).toHaveBeenCalledWith(id, data);
    });
  });

  describe('loginUser', () => {
    const testUser: LoginDto = {
      email: 'testuser',
      password: 'testpassword',
    };
    const data: UserEntity = {
        document: 34234234,
        email: 'foo@bar.com',
        name: 'test',
        password: 'password',
        Account: [],
        id: '123124124512',
      };
    it('should call IUserrepository.login with the provided UserDto', () => {
      const loginSpy = jest.spyOn(repository, 'login').mockReturnValue(of(data));
  
      service.login(testUser).subscribe(() => {
        expect(loginSpy).toHaveBeenCalledWith(testUser);
      });
    });
  
    it('should return the result from IUserrepository.login', () => {
      jest.spyOn(repository, 'login').mockReturnValue(of(data));
  
      service.login(testUser).subscribe((result) => {
        expect(result).toEqual(testUser);
      });
    });
  });


  describe('DeleteUser', () => {
    it('should call IUserrepository.deleteUserById', () => {
      const id = 'testid';

      repository.deleteUserById((id));

      service.deleteUserById(id);



      expect(repository.deleteUserById).toHaveBeenCalledWith(id);
    });
  });

  describe('getAllUsers', () => {
    it('should call IUserrepository.getAllUsers', () => {
      const userAllDtoArray: UserEntity[] = [
        {
            document: 34234234,
            email: 'foo@bar.com',
            name: 'test',
            password: 'password',
            Account: [],
            id: '123124124512',
        }
      ];
  
      const getAllUsersSpy = jest.spyOn(repository, 'getAllUsers').mockReturnValue(of(userAllDtoArray));
      
      service.getAllUsers().subscribe(() => {
        expect(getAllUsersSpy).toHaveBeenCalled();
      });
    });
  });

});
