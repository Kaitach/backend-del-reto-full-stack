import { IsEmail, IsNotEmpty } from 'class-validator';
import { AccountEntity, DepositEntity } from '../../../domain';

export class DepositDto implements DepositEntity{
    id?: string;
    accountId: string;
    userId: string;
    amount: number;
    reason: string;
   
}