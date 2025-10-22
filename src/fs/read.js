import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { stdout } from 'process';

const FOLDER_NAME = 'files';
const FILE_TO_READ = 'fileToRead.txt';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const read = async () => {
  const filePath = join(dirName, FOLDER_NAME, FILE_TO_READ);
  try {
    const content = await readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    const errorMessage = error.code === ERROR_CODE ? ERROR_MESSAGE : error.message;
    throw new Error(errorMessage);
  }
//   const stream = createReadStream(filePath, 'utf-8');
//   await new Promise((resolve, reject) => {
//     stream.on('data', (chunk) => stdout.write(chunk));
//     stream.on('end', () => {
//     stdout.write('\n \n');
//     resolve();
// });
//     stream.on('error', (error) => reject(new Error(ERROR_MESSAGE)));
//   })
};

await read();
