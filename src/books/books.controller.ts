import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  add(@Body() createBookDto: CreateBookDto) {
    return this.booksService.add(createBookDto);
  }

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':isbn')
  async getByIsbn(@Param('isbn') isbn: string, @Query("author") populateAuthor: boolean): Promise<Book> {
    //TODO:boolean is coming as string need to intercept the request and 
    return await this.booksService.getBook(isbn, String(populateAuthor) === "true");
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