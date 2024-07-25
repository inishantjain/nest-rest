import { Body, Controller, Get, Param, Post, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AddAuthorDto } from './dto/add-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  addAuthor(@Body(ValidationPipe) addAuthorDto: AddAuthorDto) {
    //validation pipe validates the object
    this.authorsService.addAuthor(addAuthorDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    //ParseIntPipe will transform the param into number
    return this.authorsService.getAuthorById(id);
  }

  @Get()
  getAllUsers() {
    return this.authorsService.getAllAuthors();
  }
}
