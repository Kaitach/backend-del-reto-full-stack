import { Types } from "mongoose";
import { TransferInterface } from "../interfaces";

export class transferEntity implements TransferInterface{
    senderAccountId: string;
    receiverAccountId: string;
    amount: number;
    id: string
}