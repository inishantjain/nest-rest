import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddAuthorDto } from './dto/add-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
    constructor(private readonly prismaService: PrismaService) { }

    async addAuthor(author: AddAuthorDto) {
        console.log(author);
        await this.prismaService.author.create({ data: author })
    }

    async editAuthor(author: UpdateAuthorDto) {
        const updatedAuthor = await this.prismaService.author.update({ where: { id: author.id, }, data: author, include: {} })

        if (!updatedAuthor) throw new HttpException('Author Not Found', HttpStatus.NOT_FOUND);
    }

    async getAuthorById(id: number) {
        const author = await this.prismaService.author.findFirst({ where: { id } })
        if (!author) throw new HttpException('Author Not Found', HttpStatus.NOT_FOUND);
        return author;
    }

    async getAllAuthors() {
        return this.prismaService.author.findMany({ include: { books: true } });//populating books in user
    }

    /*TODO:*/
    // async getAuthorByUsername(username: string)

}
