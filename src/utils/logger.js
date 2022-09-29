import { createLogger, transports, format } from 'winston';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const logger = createLogger({
  transports: [
    new transports.File({ filename: `${__dirname}/../logs/info.log`, level: 'info' }),
    new transports.File({ filename: `${__dirname}/../logs/warn.log`, level: 'warn' }),
    new transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
  ],
})

