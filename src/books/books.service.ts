import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }

  async add(book: CreateBookDto) {
    book.authorId = Number(book.authorId)//FIXME: authorId receiving as string, we need it as number

    const user = await this.prismaService.author.findUnique({ where: { id: book.authorId } });
    if (!user) throw new HttpException('Author Not Found With Provided authorId:' + book.authorId, HttpStatus.NOT_FOUND);
    await this.prismaService.book.create({ data: book });
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.prismaService.book.findMany();
    return books;
  }

  async getBook(isbn: string, populateAuthor: boolean = false) {
    const book = await this.prismaService.book.findFirst({ where: { isbn }, include: { author: populateAuthor } });
    if (!book) throw new HttpException('Book Not Found', HttpStatus.NOT_FOUND);
    return book;
  }

  async editBook(isbn: string, book: UpdateBookDto) {
    const isPresent = await this.prismaService.book.findFirst({ where: { isbn } });
    if (!isPresent) throw new HttpException('Book Not Found', HttpStatus.NOT_FOUND);
    await this.prismaService.book.updateMany({ where: { isbn: isbn }, data: book })
  }

  async remove(isbn: string) {
    const isPresent = await this.prismaService.book.findFirst({ where: { isbn } });
    if (!isPresent) throw new HttpException('Book Not Found', HttpStatus.NOT_FOUND);
    await this.prismaService.book.deleteMany({ where: { isbn: isbn } })
  }
}
