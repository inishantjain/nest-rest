import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AddAuthorDto } from './dto/add-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  addAuthor(@Body() author: AddAuthorDto) {
    this.authorsService.addAuthor(author);
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.authorsService.getAuthorById(+id);
  }

  @Get()
  getAllUsers() {
    return this.authorsService.getAllAuthors();
  }
}
