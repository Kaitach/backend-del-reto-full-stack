import { Observable } from "rxjs";
import { TransferService } from "src/domain/service/transer-domain.service";
import { IUseCase } from "../useCase/interface/IUseCase.interface";
import { createTransferUseCase } from "../useCase/transferUseCase/createTransferUseCase";
import { AccountService } from "src/domain";

export class TransferDelegate implements IUseCase {
    private delegate: IUseCase;
  
    constructor( private readonly transferService: TransferService,   
          private readonly accountService: AccountService,
        ) {}
  
    execute<Response>(...args: any[]): Observable<Response> {
      return this.delegate.execute(...args);
    }
  
    tocreateTransfer(): void {
      this.delegate = new createTransferUseCase(this.accountService, this.transferService);
    } }