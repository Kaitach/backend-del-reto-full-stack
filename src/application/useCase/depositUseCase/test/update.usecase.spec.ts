import { DepositEntity } from '../../../../domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { UpdateDepositUseCase } from '..';
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';

describe('DeleteUseCase', () => {
  let useCase: UpdateDepositUseCase;
  let repository: DepositSertivce

  beforeEach(() => {
    repository = {
        updateDeposit: jest.fn(),
    } as any as DepositSertivce;
    useCase = new UpdateDepositUseCase(repository);
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
    const expectedInstanceType = Observable<DepositEntity>;
    const stubDelete = jest.fn(
      () =>
        new Observable<DepositEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'updateDeposit').mockReturnValue(stubDelete());


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
