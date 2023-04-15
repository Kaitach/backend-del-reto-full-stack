import { DepositEntity, UserEntity, UserService } from 'src/domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';
import { FindByIdDepositUseCase } from '..';

describe('DeleteUseCase', () => {
  let useCase: FindByIdDepositUseCase;
  let repository: DepositSertivce

  beforeEach(() => {
    repository = {
        getDepositById: jest.fn(),
    } as any as DepositSertivce;
    useCase = new FindByIdDepositUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: DepositEntity = {
        accountId: '213123',
        userId: '123123',
        amount: 0,
        reason: 'nada'
    }
     
     
    const expectedData = true;
    const expectedInstanceType = Observable<UserEntity>;
    const stubDelete = jest.fn(
        () =>
          new Observable<DepositEntity>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
    jest.spyOn(repository, 'getDepositById').mockReturnValue(stubDelete());


    const result = useCase.execute(_id);


    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        done();
      },
    });
  });

    });
