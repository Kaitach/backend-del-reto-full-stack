import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountEntity, DepositEntity } from '../../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto implements DepositEntity{
    @ApiProperty({ example: '1', description: 'Unique identifier of the deposit' })
    id?: string;
  
    @ApiProperty({ example: '2', description: 'Unique identifier of the account receiving the deposit' })
    @IsString()
    accountId: string;
  
    @ApiProperty({ example: '3', description: 'Unique identifier of the user making the deposit' })
    @IsString()
    userId: string;
  
    @ApiProperty({ example: 1000, description: 'Amount being deposited' })
    @IsNumber()
    amount: number;
  
    @ApiProperty({ example: 'Salary deposit', description: 'Reason for the deposit' })
    @IsString()
    reason: string;
   
}