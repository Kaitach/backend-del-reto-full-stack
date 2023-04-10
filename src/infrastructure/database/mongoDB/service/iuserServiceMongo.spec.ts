import { TestingModule, Test } from "@nestjs/testing";
import { of } from "rxjs";
import { addFavoriteEventPublisher } from "../../../messaging/publisher/add-Favorite-User.publisher";
import { UserDto, UserAllDto, UserRegistredDto, UserUpdatedDto } from "../../../utils/dtos";
import { IUserrepository } from "../repository/Userrepository";
import { IUserServiceMongo } from "./iuserservicemongo.service";


describe('IUserServiceMongo', () => {
  let service: IUserServiceMongo;
  let repository: IUserrepository;
  let publisher: addFavoriteEventPublisher;

  const testUser: UserDto = {
    UserName: 'testuser',
    Password: 'testpassword',
  };

  const testUserId = 'testuserid';

  const testUserAll: UserAllDto = {
    id: testUserId,
    UserName: 'testuser',
    Name: 'Test',
    Email: 'testuser@test.com',
  };

  const testUserRegistred: UserRegistredDto = {
    UserName: 'testuser',
    Name: 'Test',
    Email: 'testuser@test.com',
  };

  const testUserUpdate: UserUpdatedDto = {
    Name: 'New',
    Email: 'newemail@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IUserServiceMongo,
        {
          provide: IUserrepository,
          useValue: {
            findUserByName: jest.fn(),
            deleteUserById: jest.fn(),
            update: jest.fn(),
            getAllUsers: jest.fn(),
    create: jest.fn().mockReturnValue(of(testUserRegistred)),
            login: jest.fn(),
          },
        },
        {
          provide: addFavoriteEventPublisher,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IUserServiceMongo>(IUserServiceMongo);
    repository = module.get<IUserrepository>(IUserrepository);
    publisher = module.get<addFavoriteEventPublisher>(addFavoriteEventPublisher);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addFavorite', () => {
    it('should call IUserrepository.findUserByName and addFavoriteEvent.publish', () => {
      const name = 'testuser';
      const data = 'testdata';
      const testUserId = 'testuserid'; // Define el ID de usuario
  
      const findUserByNameSpy = jest.spyOn(repository, 'findUserByName');
      const user = new UserRegistredDto();
      user.Id = testUserId; // Establece el ID de usuario
  
      findUserByNameSpy.mockReturnValue(of(user));    
  
      service.addFavorite(name, data).subscribe();
  
      expect(repository.findUserByName).toHaveBeenCalledWith(name);
    });
  });

  describe('DeleteUser', () => {
    it('should call IUserrepository.deleteUserById', () => {
      const id = 'testid';

      repository.deleteUserById((id));

      service.DeleteUser(id);



      expect(repository.deleteUserById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should call IUserrepository.update', () => {
      const id = 'testid';
      const data: UserUpdatedDto = {
        Name: 'New',
        Email: 'newemail@test.com',
      };

      repository.update(id,testUserAll);

      service.updateUser(id, data)

      expect(repository.update).toHaveBeenCalledWith(id, data);
    });
  });

  describe('findUserByName', () => {
    const testName = 'testuser';
    const testUser: UserRegistredDto = {
      UserName: testName,
      Name: 'Test',
      Email: 'testuser@test.com',
    };
  
    beforeEach(() => {
      jest.spyOn(repository, 'findUserByName').mockReturnValue(of(testUser));
    });
  
    it('should call IUserrepository.findUserByName with the correct name', () => {
      service.findUserByName(testName).subscribe();
      expect(repository.findUserByName).toHaveBeenCalledWith(testName);
    });
  
    it('should return the user with the given name', (done) => {
      service.findUserByName(testName).subscribe((user) => {
        expect(user).toEqual(testUser);
        done();
      });
    });



    describe('loginUser', () => {
      const testUser: UserDto = {
        UserName: 'testuser',
        Password: 'testpassword',
      };
    
      it('should call IUserrepository.login with the provided UserDto', () => {
        const loginSpy = jest.spyOn(repository, 'login').mockReturnValue(of(testUser));
    
        service.loginUser(testUser).subscribe(() => {
          expect(loginSpy).toHaveBeenCalledWith(testUser);
        });
      });
    
      it('should return the result from IUserrepository.login', () => {
        jest.spyOn(repository, 'login').mockReturnValue(of(testUser));
    
        service.loginUser(testUser).subscribe((result) => {
          expect(result).toEqual(testUser);
        });
      });
    });


    describe('registerUser', () => {
      it('should call IUserrepository.create and return the created user', () => {
        const user: UserRegistredDto = {
          UserName: 'testuser',
          Name: 'Test',
          Email: 'testuser@test.com',
        };
        
        const createdUser: UserRegistredDto = {
          Id: '1',
          UserName: 'testuser',
          Name: 'Test',
          Email: 'testuser@test.com',
        };
    
        jest.spyOn(repository, 'create').mockReturnValue(of(createdUser));
    
        service.registerUser(user).subscribe((result) => {
          expect(result).toEqual(createdUser);
          expect(repository.create).toHaveBeenCalledWith(user);
        });
      });
    });

  });







  describe('getAllUsers', () => {
    it('should call IUserrepository.getAllUsers', () => {
      const userAllDtoArray: UserAllDto[] = [
        {
          id: 'testuserid',
          UserName: 'testuser',
          Name: 'Test',
          Email: 'testuser@test.com',
        }
      ];
  
      const getAllUsersSpy = jest.spyOn(repository, 'getAllUsers').mockReturnValue(of(userAllDtoArray));
      
      service.getAllUsers().subscribe(() => {
        expect(getAllUsersSpy).toHaveBeenCalled();
      });
    });
  });

 })