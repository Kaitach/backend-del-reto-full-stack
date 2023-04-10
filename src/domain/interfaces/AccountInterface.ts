import { Types } from 'mongoose';

export interface IAccount {
  id?: string
  type: string;
  amount: number;
}
