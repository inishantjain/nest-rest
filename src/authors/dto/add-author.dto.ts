import { Optional } from '@nestjs/common';
import { Author } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorDto implements Author {
  @IsEmail()
  email: string;
  @Optional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;
}
