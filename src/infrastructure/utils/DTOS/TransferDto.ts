import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { transferEntity } from "../../../domain";


export class TransferDto implements transferEntity{
    @ApiProperty({ example: '1', description: 'Unique identifier of the transfer' })
  @IsString()
  id: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of the sender account' })
  @IsString()
  @IsNotEmpty()
  senderAccountId: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of the receiver account' })
  @IsString()
  @IsNotEmpty()
  receiverAccountId: string;

  @ApiProperty({ example: 1000, description: 'Amount being transferred' })
  @IsNumber()
  amount: number;

 
}