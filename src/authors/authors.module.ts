import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [AuthorsService], //<-- NOTE:  these providers will be used for dependency injection for this module
})
export class AuthorsModule {}
