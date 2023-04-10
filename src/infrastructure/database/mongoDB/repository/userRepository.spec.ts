import { UserUpdatedDto } from './../../../../domain/interface/dtos/userUpdate';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { UserRegistredDto } from '../../../utils/dtos/userRegiserDto';
import { User, UserDocument } from '../schemas/user.schema';
import { async, of, lastValueFrom, throwError, from } from 'rxjs';
import { IUserrepository } from './Userrepository';
import { UpdateResult, DeleteResult } from 'mongodb';
import { ObjectId } from 'mongodb';
import { UserAllDto, UserDeleteDto } from '../../../utils/dtos';


describe('IUserrepository', () => {
  let Userrepository: IUserrepository;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IUserrepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    Userrepository = module.get<IUserrepository>(IUserrepository);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(
      /* Una clase que implementa la interfaz `IUserrepository`. */
      Userrepository,
    ).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange

      const user = {
        UserName: 'foo',
        Password: 'bar',
        Recipes: [],
        RecipesFavorite: [],
      };

      const createUser = {
        _id: '641c70d41964e9445f593bcc',
        UserName: 'foo',
        Password: 'bar',
        Recipes: [],
        RecipesFavorite: [],
      };

      const expectuser = {
        _id: '641c70d41964e9445f593bcc',
        UserName: 'foo',
        Password: 'bar',
        Recipes: [],
        RecipesFavorite: [],
      };
      jest.spyOn(model, 'create').mockReturnValue(of(createUser) as any);

      // Act
      const result = Userrepository.create(user);

      // Assert

      expect(await lastValueFrom(result)).toEqual(expectuser);
    });
  });

  
  describe('find by name', () => {
    it('should find user by name', async () => {
      // Arrange
      const userName = 'foo';
      const user = {
        _id: '641c70d41964e9445f593bcc',
        UserName: userName,
        Password: 'bar',
        Recipes: [],
        RecipesFavorite: [],
      };
      jest.spyOn(model, 'findOne').mockReturnValue(of(user) as any);

      // Act
      const result = Userrepository.findUserByName(userName);

      // Assert
      expect(await lastValueFrom(result)).toEqual(user);
    });

    it('should throw an error if Error al buscar el usuario', async () => {
      // Arrange
      const userName = 'nonexistentuser';
      const errorMessage = 'Error al buscar el usuario';
      const errores = Error;
      jest.spyOn(model, 'findOne').mockResolvedValue(null as null);

      // Act
      const result = Userrepository.findUserByName(userName);
      console.log('result');
      // Assert
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(errores);
          expect(error.message).toEqual(errorMessage);
        },
      });
    });


    });
   
        
    
     
  describe('login', () => {
    it('should log in a user', async () => {
      // Arrange
      const user = {
        UserName: 'foo',
        Password: 'bar',
      };

      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          _id: '641c70d41964e9445f593bcc',
          UserName: 'foo',
          Password: 'bar',
          Recipes: [],
          RecipesFavorite: [],
        }),
      } as unknown as Query<UserDocument | null, UserDocument>);

      const expectedUser = {
        _id: '641c70d41964e9445f593bcc',
        UserName: 'foo',
        Password: 'bar',
        Recipes: [],
        RecipesFavorite: [],
      };

      // Act
      const result = Userrepository.login(user);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedUser);
      expect(findSpy).toHaveBeenCalledWith({ UserName: user.UserName });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Arrange
      const userDocuments = [
        {
          _id: '1',
          UserName: 'john_doe',
          Name: 'John Doe',
          Password: 'password',
          Email: 'john_doe@example.com',
          Phone: '123456789',
          Recipes: ['recipe1', 'recipe2'],
          shoppingList: [
            {
              name: 'ingredient1',
              quantity: 1,
            },
            {
              name: 'ingredient2',
              quantity: 2,
            },
          ],
          RecipesFavorite: ['recipe1'],
        },
        {
          _id: '2',
          UserName: 'jane_doe',
          Name: 'Jane Doe',
          Password: 'password',
          Email: 'jane_doe@example.com',
          Phone: '987654321',
          Recipes: ['recipe3', 'recipe4'],
          shoppingList: [
            {
              name: 'ingredient3',
              quantity: 3,
            },
            {
              name: 'ingredient4',
              quantity: 4,
            },
          ],
          RecipesFavorite: ['recipe4'],
        },
      ];
      jest.spyOn(model, 'find').mockReturnValue(of(userDocuments) as any);

      // Act
      const result = await lastValueFrom(Userrepository.getAllUsers());

      // Assert
      expect(result).toEqual([
        {
          id: '1',
          userName: 'john_doe',
          name: 'John Doe',
          password: 'password',
          email: 'john_doe@example.com',
          phone: '123456789',
          recipes: ['recipe1', 'recipe2'],
          shoppingList: [
            {
              name: 'ingredient1',
              quantity: 1,
            },
            {
              name: 'ingredient2',
              quantity: 2,
            },
          ],
          recipesFavorite: ['recipe1'],
        },
        {
          id: '2',
          userName: 'jane_doe',
          name: 'Jane Doe',
          password: 'password',
          email: 'jane_doe@example.com',
          phone: '987654321',
          recipes: ['recipe3', 'recipe4'],
          shoppingList: [
            {
              name: 'ingredient3',
              quantity: 3,
            },
            {
              name: 'ingredient4',
              quantity: 4,
            },
          ],
          recipesFavorite: ['recipe4'],
        },
      ]);
    });
  });

  describe('UserModule', () => {
    it('should add a favorite recipe to a user', async () => {
      const userId = new ObjectId().toHexString();
      const newRecipe = 'Spaghetti Carbonara';
      const expectedMessage = `Receta ${newRecipe} agregada al usuario con id ${userId} correctamente`;

      const updateResult = {
        _id: new ObjectId(userId),
        RecipesFavorite: [newRecipe],
      };

      jest.spyOn(model, 'updateOne').mockReturnValue(userId as any);

      const result = await Userrepository.addFavorite(
        userId,
        newRecipe,
      ).toPromise();

      expect(result).toEqual(expectedMessage);
      expect(model.updateOne).toHaveBeenCalledWith(
        { _id: new ObjectId(userId) },
        { $push: { RecipesFavorite: newRecipe } },
      );
    });
  });


  describe('addRecipe', () => {
    it('should add a recipe to the user when the user is found', (done) => {
      // Arrange
      const userName = 'existinguser';
      const newRecipe = 'Pasta with tomato sauce';
      const expectedMessage = `Receta ${newRecipe} agregada al usuario con id ${userName} correctamente`;
  
      const updateOneSpy = jest.spyOn(model, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as unknown as Query<UpdateResult, unknown, {}, UserDocument>);  
      // Act
      const result$ = Userrepository.addRecipe(userName, newRecipe);
  
      // Assert
      result$.subscribe((message) => {
        expect(message).toEqual(expectedMessage);
        expect(updateOneSpy).toHaveBeenCalledWith(
          { UserName: userName },
          { $push: { Recipes: newRecipe } },
        );
        done();
      });
    });
  });

  describe('update', () => {
    it('should update a user when the user is found', (done) => {
      // Arrange
      const userId = '6424f91a55dc596e4b908723';
      const updatedUserData = { UserName: 'newusername', Password: 'newpassword' };
      const expectedUser = { id: userId, ...updatedUserData };
  
      const execMock = jest.fn().mockResolvedValueOnce(expectedUser);
      const findOneAndUpdateSpy = jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce({
        exec: execMock,
      } as unknown as Query<UserDocument | null, UserDocument>);
  
      // Act
      const result$ = Userrepository.update(userId, updatedUserData);
  
      // Assert
      result$.subscribe((user) => {
        expect(user).toEqual(expectedUser);
        expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
          { _id: new ObjectId(userId) },
          updatedUserData,
          { new: true },
        );
        done();
      });
    });
    
  });
   



  describe('deleteUserById', () => {
    it('should delete a user when the user is found', async () => {
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;
  
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 })
      } as unknown as Query<any, any>);
  
      // Act
      const result = await Userrepository.deleteUserById(id);
  
      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });




    it('should catch an error if deleteUserById fails', async () => {
      const id = '641c70d41964e9445f593bcc';
      const errorMessage = 'Error al eliminar el usuario';
      const errores = Error;
    
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error(errorMessage))
      } as unknown as Query<any, any>);
    
      const result = Userrepository.deleteUserById(id);
    
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(errores);
          expect(error.message).toEqual(errorMessage);
        },
      });
    });



  

}) })