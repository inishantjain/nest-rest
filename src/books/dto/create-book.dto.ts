import { Book } from '@prisma/client';
// import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto implements Book {
  id: number;
  @IsString()
  @IsNotEmpty()
  isbn: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  authorId: number;
}
