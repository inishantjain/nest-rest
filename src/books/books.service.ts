import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async add(createBookDto: CreateBookDto) {
    const user = await this.databaseService.author.findUnique({
      where: { id: createBookDto.authorId },
    });
    if (!user) throw new NotFoundException('Author Not Found With Provided authorId:' + createBookDto.authorId);
    await this.databaseService.book.create({ data: createBookDto });
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.databaseService.book.findMany();
    return books;
  }

  async getBook(isbn: string, populateAuthor: boolean = false) {
    const book = await this.databaseService.book.findFirst({
      where: { isbn },
      include: { author: populateAuthor },
    });
    if (!book) throw new NotFoundException('Book Not Found');
    return book;
  }

  async editBook(isbn: string, updateBookDto: UpdateBookDto) {
    const isPresent = await this.databaseService.book.findFirst({
      where: { isbn },
    });
    if (!isPresent) throw new NotFoundException('Book Not Found');
    await this.databaseService.book.updateMany({
      where: { isbn: isbn },
      data: updateBookDto,
    });
  }

  async remove(isbn: string) {
    const isPresent = await this.databaseService.book.findFirst({
      where: { isbn },
    });
    if (!isPresent) throw new NotFoundException('Book Not Found');
    await this.databaseService.book.deleteMany({ where: { isbn: isbn } });
  }
}
