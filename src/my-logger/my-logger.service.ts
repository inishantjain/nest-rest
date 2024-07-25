import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

//NOTE: this is our custom logger service
@Injectable({ scope: Scope.TRANSIENT }) //transient scope ensures that we'll have a unique instance of the MyLogger in each feature module.
export class MyLoggerService extends ConsoleLogger {
  log(message: any, context: string = this.context) {
    //give default context when context not provided by the developer
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext: string = this.context) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }

  //NOTE: logging to file here
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }
}
