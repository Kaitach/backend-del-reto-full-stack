import { AccountEntity, AccountService, DepositEntity } from '../../../../domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { UpdateAccountUseCase,  } from '..';
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';

describe('DeleteUseCase', () => {
  let useCase: UpdateAccountUseCase;
  let repository: AccountService

  beforeEach(() => {
    repository = {
      updateAccount: jest.fn(),
    } as any as AccountService;
    useCase = new UpdateAccountUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.delete', (done) => {

    const _id = '641c65deff0153dd0f36bf5';
    const mockData: AccountEntity = {
      type: 'debit',
      amount: 0,
      userID: '1231'
    }
     
    const expectedData = true;
    const expectedInstanceType = Observable<DepositEntity>;
    const stubDelete = jest.fn(
      () =>
        new Observable<AccountEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'updateAccount').mockReturnValue(stubDelete());


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
