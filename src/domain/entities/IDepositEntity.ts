import { Types } from "mongoose";
import { IDeposit } from "../interfaces/IDeposit";

export class DepositEntity implements IDeposit{
    accountId: string;
    userId: string;
    amount: number;
    reason: string;


    constructor(accountId?: string, userId?: string, amount?: number, reason?: string) {
        this.accountId = accountId;
        this.userId = userId;
        this.amount = amount;
        this.reason = reason;
    }
}