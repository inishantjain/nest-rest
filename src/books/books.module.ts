import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  imports: [DatabaseModule, MyLoggerModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
