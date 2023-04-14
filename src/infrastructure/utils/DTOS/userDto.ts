import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: 123456789, description: 'The user document number' })
  @IsNotEmpty()
  @IsString()
  document: number;

  @ApiProperty({ example: 'John Doe', description: 'The user name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'The user email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'The user password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;


}
