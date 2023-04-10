import { Types } from "mongoose";

export interface IDeposit {
    accountId: string;
    userId: string;
    amount: number;
    reason: string;
  }
  