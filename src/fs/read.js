import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_TO_READ = 'fileToRead.txt';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, FOLDER_NAME, FILE_TO_READ);

const read = async () => {
  try {
    const content = await readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    const errorMessage = error.code === ERROR_CODE ? ERROR_MESSAGE : error.message;
    throw new Error(errorMessage);
  }
};

await read();
