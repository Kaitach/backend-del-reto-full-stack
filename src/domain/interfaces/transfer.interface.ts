import { Types } from 'mongoose';

export interface TransferInterface {
  id: string
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
}
