import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost); //get method of app retrieves singleton instance of the class
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useLogger(new MyLoggerService()); //NOTE: using our custom logger service for logger
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
