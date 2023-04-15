import { AccountEntity, AccountService, DepositEntity, UserEntity, UserService } from 'src/domain';
import { Observable, throwError } from 'rxjs';

import { InternalServerErrorException } from '@nestjs/common';
import { DepositSertivce } from 'src/domain/service/deposit-domain.service';
import { FindByIdAccountUseCase } from '..';

describe('DeleteUseCase', () => {
  let useCase: FindByIdAccountUseCase;
  let repository: AccountService

  beforeEach(() => {
    repository = {
      getAccountById: jest.fn(),
    } as any as AccountService;
    useCase = new FindByIdAccountUseCase(repository);
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
    const expectedInstanceType = Observable<AccountEntity>;
    const stubDelete = jest.fn(
        () =>
          new Observable<AccountEntity>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
    jest.spyOn(repository, 'getAccountById').mockReturnValue(stubDelete());


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
