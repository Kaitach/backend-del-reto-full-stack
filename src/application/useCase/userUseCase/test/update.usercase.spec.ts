import { UserEntity, UserService } from 'src/domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserUseCase } from '..';

describe('DeleteUseCase', () => {
  let useCase: UpdateUserUseCase;
  let repository: UserService

  beforeEach(() => {
    repository = {
        updateUser: jest.fn(),
    } as any as UserService;
    useCase = new UpdateUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: UserEntity = {
        document: 22213,
        id :  '641c65deff0153dd0f36bf5',
        name:  'string',
        email:  'string@gmail.com',
        password:  '12312323',
        Account:  []
    }
     
    const expectedData = true;
    const expectedInstanceType = Observable<UserEntity>;
    const stubDelete = jest.fn(
      () =>
        new Observable<UserEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'updateUser').mockReturnValue(stubDelete());


    const result = useCase.execute(_id, mockData);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        done();
      },
    });
  });

    });
