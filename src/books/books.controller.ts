import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle() //NOTE: skips throttling for this entire books route, yes we can customize our defined throttle for a particular route or request
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly logger: MyLoggerService,
  ) {
    this.logger.setContext(BooksController.name);
  }

  @SkipThrottle({ default: false }) //NOTE: if controller as a whole is skipped from throttling, this particular request will not be skipped from throttling
  @Post()
  add(@Body() createBookDto: CreateBookDto) {
    return this.booksService.add(createBookDto);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) //NOTE: here we have override our defined throttle for this particular request
  @Get()
  getAllBooks(@Ip() ip: string) {
    this.logger.log(`Request for all books\t${ip}`);
    return this.booksService.getAllBooks();
  }

  @Get(':isbn')
  async getByIsbn(@Param('isbn') isbn: string, @Query('author') populateAuthor: boolean): Promise<Book> {
    return await this.booksService.getBook(isbn, populateAuthor === true);
  }

  @Patch(':isbn')
  edit(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.editBook(isbn, updateBookDto);
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.booksService.remove(isbn);
  }
}
