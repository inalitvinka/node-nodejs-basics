import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { stdin } from 'process';
import { pipeline } from 'stream/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const write = async () => {
  const pathToFile = join(dirName, FOLDER_NAME, FILE_NAME);
  try {
    await pipeline(stdin, createWriteStream(pathToFile))
  } catch (error) {
    console.error(error.message);
  }
};

await write();
