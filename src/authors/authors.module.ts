import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService],//<-- NOTE:  these providers will be used for dependency injection for this module
})
export class AuthorsModule { }
