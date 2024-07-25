import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

//NOTE: throttle module-> allow limit amount of requests in ttl(time to live) amount of time
//throttler is used for rate limiting

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 }, //NOTE: hear we can define multiple throttler definitions in array
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    MyLoggerModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
