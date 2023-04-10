import { transferEntity } from "src/domain";


export class TransferDto implements transferEntity{
    senderAccountId: string;
    receiverAccountId: string;
    amount: number;
    id: string;

 
}