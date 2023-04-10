import { IsEmail, IsNotEmpty } from 'class-validator';
import { AccountEntity } from '../../../domain';

export class AccountDto implements AccountEntity{
    id?: string;
    type: string;
    amount: number;
    userID: string;
 
}