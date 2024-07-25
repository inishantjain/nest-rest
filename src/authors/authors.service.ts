import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAuthorDto } from './dto/add-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addAuthor(author: AddAuthorDto) {
    await this.databaseService.author.create({ data: author });
  }

  async updateAuthor(updateAuthorDto: UpdateAuthorDto) {
    const updatedAuthor = await this.databaseService.author.update({
      where: { id: updateAuthorDto.id },
      data: updateAuthorDto,
      include: {},
    });

    if (!updatedAuthor) throw new NotFoundException('Author Not Found');
  }

  async getAuthorById(id: number) {
    const author = await this.databaseService.author.findFirst({
      where: { id },
    });
    if (!author) throw new NotFoundException('Author Not Found');
    return author;
  }

  async getAllAuthors() {
    return this.databaseService.author.findMany({ include: { books: true } }); //populating books in user
  }

  /*TODO:*/
  // async getAuthorByUsername(username: string)
}
