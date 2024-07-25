import { Book as BookDbStructure } from '@prisma/client';

export class Book implements BookDbStructure {
  id: number;
  isbn: string;
  title: string;
  authorId: number;
}
