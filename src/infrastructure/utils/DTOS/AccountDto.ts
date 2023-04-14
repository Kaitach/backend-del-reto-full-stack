import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountEntity } from '../../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto implements AccountEntity{
    @ApiProperty({ example: '1', description: 'Unique identifier of the account' })
    id?: string;
  
    @ApiProperty({ example: 'checking', description: 'Account type' })
    @IsString()
    type: string;
  
    @ApiProperty({ example: 1000, description: 'Account balance' })
    @IsNumber()
    amount: number;
  
    @ApiProperty({ example: '1', description: 'Unique identifier of the user' })
    @IsString()
    userID: string;
 
}