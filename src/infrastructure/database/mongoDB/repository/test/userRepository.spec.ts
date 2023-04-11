import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { UserEntity } from '../../../../../domain';
import { RegisterUserDto } from '../../../../';
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
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
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






  describe('getUserById', () => {
    it('should return a user', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const expectedUser = new UserEntity(
        id,
        'Test User',
        'testuser@example.com',
        'testpassword',
        123456789,
        [],
      );

      jest.spyOn(userModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(expectedUser),
      } as unknown as Query<UserDocument | null, UserDocument>);

      // Act
      const result$ = repository.getUserById(id);

      // Assert
      await expect(result$).resolves.toEqual(expectedUser);
    });

  
  });

  describe('deleteUserById', () => {
    it('should delete a user when the user is found', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;
  
      jest.spyOn(userModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 })
      } as unknown as Query<any, any>);
  
      // Act
      const result$ = repository.deleteUserById(id);
  
      // Assert
      await expect(result$).toBeObservable(of(expectedResponse));
    });
  });
  
  
  



});
