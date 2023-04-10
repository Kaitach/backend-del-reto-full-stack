import { Account } from './../../infrastructure/database/mongoDB/schemas/account.schema';
import { Types } from "mongoose";

export interface IUser {
    id: string
    name: string;
    email: string;
    password: string;
    document:number;
    Account: string[]
  }
  