import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { UserEntity } from '../../../../../domain';
import { LoginDto, RegisterUserDto } from '../../../../';
import { UserDocument, User } from '../../schemas';
import { IUserrepository } from '../Userrepository';
import { lastValueFrom, of } from 'rxjs';
import { ObjectId } from 'mongodb';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('IUserrepository', () => {
  let repository: IUserrepository;
  let userModel: Model<UserDocument>;

  const mockUserModel = () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    find: jest.fn(),
    getUserByEmail: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IUserrepository,
        {
          provide: getModelToken(User.name),
          useFactory: mockUserModel,
        },
      ],
    }).compile();

    repository = module.get<IUserrepository>(IUserrepository);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const user = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword',
        document: 123456789,
      } as RegisterUserDto;

      const createdUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword',
        document: 123456789,
        Account: [],
      } as UserDocument;

      const expectedUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword',
        document: 123456789,
        Account: [],
      };

      jest
        .spyOn(userModel, 'create')
        .mockReturnValueOnce(of(createdUser) as any);

      // Act
      const result$ = repository.createUser(user);

      // Assert
      await expect(result$.toPromise()).resolves.toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const user = new UserEntity(
        id,
        'Test User',
        'testuser@example.com',
        'testpassword',
        123456789,
        [],
      );

      const updatedUser = {
        _id: '641c70d41964e9445f593bcc',
        name: 'Test User Updated',
        email: 'testuserupdated@example.com',
        password: 'testpasswordupdated',
        document: 987654321,
        Account: [],
      } as UserDocument;

      const expectedUser = new UserEntity(
        id,
        'Test User Updated',
        'testuserupdated@example.com',
        'testpasswordupdated',
        987654321,
      );
      const execMock = jest.fn().mockResolvedValueOnce(expectedUser);
      const findOneAndUpdateSpy = jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockReturnValueOnce({
          exec: execMock,
        } as unknown as Query<UserDocument | null, UserDocument>);

      // Act
      const result$ = repository.updateUser(id, user);

      // Assert
      result$.subscribe((user) => {
        expect(user).toEqual(expectedUser);
        expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
          { _id: new ObjectId(id) },
          updatedUser,
          { new: true },
        );
      });
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user when the user is found', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;
  
      jest.spyOn(userModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 })
      } as unknown as Query<any, any>);
  
      // Act
      const result = await repository.deleteUserById(id);
  
      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });
  
  
  
    describe('FindRecipeById', () => {
      it('should find a user by id and return it', async () => {
        const id = '123';
        const user = {
          _id: id,
          Account: [],
          document: 123,
          email: 'email1',
          name: 'name1',
          password: 'password1',
        };
    
        jest.spyOn(userModel, 'findById').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(user),
        } as any);
    
        const consoleSpy = jest.spyOn(console, 'log');
        const result = await lastValueFrom(repository.getUserById(id));
    
        expect(result).toEqual({
          id: user._id.toString(),
          Account: user.Account,
          document: user.document,
          email: user.email,
          name: user.name,
          password: user.password,
        });
        expect(consoleSpy).toHaveBeenCalledWith(`Usuario ${user._id} ha sido encontrado.`);
      });

    });
    
      
      it('should throw an error if an error occurs while searching for a recipe', async () => {
        const data = '1';
        jest.spyOn(userModel, 'findById').mockReturnValueOnce({
          exec: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        } as any);
    
        await expect(lastValueFrom(repository.getUserById(data))).rejects.toThrow('Error al buscar el usuario');
        expect(userModel.findById).toHaveBeenCalledWith(data);
      });
    });
    
    
    describe('getAllUsers', () => {
     ;
    
      it('should return an array of UserEntity objects', async () => {
        const userDocuments: UserEntity[] = [
          {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            Account: [],
            document: 24324,
            id: '21'

          },
          {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            Account: [],
            document: 24324,
            id: '21'
          },
        ];
        jest.spyOn(userModel, 'find').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(userDocuments),
        } as any);
    
        const expectedUsers: UserEntity[] = userDocuments.map((userDocument) => {
          const userEntity = new UserEntity();
          userEntity.name = userDocument.name;
          userEntity.email = userDocument.email;
          userEntity.password = userDocument.password;
          return userEntity;
        });
    
        const result = await repository.getAllUsers().toPromise();
    
        expect(result).toEqual(expectedUsers);
        expect(userModel.find).toHaveBeenCalledTimes(1);
      });
    
      it('should throw an error if an error occurs while searching for users', async () => {
        jest.spyOn(userModel, 'find').mockReturnValueOnce({
          exec: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        } as any);
    
        await expect(repository.getAllUsers().toPromise()).rejects.toThrow('Error find user');
        expect(userModel.find).toHaveBeenCalledTimes(1);
      });
    });
    
    describe('Login', () => {
      it('should find a user by email and return it', async () => {
        const loginDto: LoginDto = { email: 'test@test.com', password: 'password123' };
        const user = {
          Account: [],
          document: 123,
          email: loginDto.email,
          name: 'name1',
          password: 'password123',
        };
    
        jest.spyOn(userModel, 'findOne').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(user),
        } as any);
    
        const result = await lastValueFrom(repository.login(loginDto));
    
        expect(result).toEqual({
          Account: user.Account,
          document: user.document,
          email: user.email,
          name: user.name,
          password: user.password,
        });
      });
    
     
    });


    describe('getUserByEmail', () => {
      it('should return the user with the given email', async () => {
        const email = 'test@test.com';
        const userDoc = {
          _id: '123',
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
          document: 123,
          Account: [],
        };
        const userModelMock = {
          findOne: jest.fn().mockResolvedValueOnce(userDoc),
        };
        const repository = new IUserrepository(userModelMock as any);
        
        const result$ = repository.getUserByEmail(email);
        const result = await lastValueFrom(result$);
    
        expect(userModelMock.findOne).toHaveBeenCalledWith({ email });
        expect(result).toEqual({
          id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          password: userDoc.password,
          document: userDoc.document,
          Account: userDoc.Account,
        });
      });
    
      it('should throw an exception when user is not found', async () => {
        const email = 'nonexistent@test.com';
        const userModelMock = {
          findOne: jest.fn().mockResolvedValueOnce(null),
        };
        const repository = new IUserrepository(userModelMock as any);
    
        try {
          const result$ = repository.getUserByEmail(email);
          await lastValueFrom(result$);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('Error find usernonexistent@test.com');
          expect(userModelMock.findOne).toHaveBeenCalledWith({ email });
        }
      });
    
      it('should throw an error when an error occurs during the search for the user', async () => {
        const email = 'test@test.com';
        const userModelMock = {
          findOne: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        };
        const repository = new IUserrepository(userModelMock as any);
    
        try {
          const result$ = repository.getUserByEmail(email);
          await lastValueFrom(result$);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('Error find usertest@test.com');
          expect(userModelMock.findOne).toHaveBeenCalledWith({ email });
        }
      });
    });
    


    
});
