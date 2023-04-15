import { UserService } from 'src/domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { DeleteUserUseCase } from '..';

describe('DeleteUseCase', () => {
  let useCase: DeleteUserUseCase;
  let repository: UserService

  beforeEach(() => {
    repository = {
        deleteUserById: jest.fn(),
    } as any as UserService;
    useCase = new DeleteUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'deleteUserById').mockReturnValue(stubDelete());


    const result = useCase.execute(_id);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

    });
