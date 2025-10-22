import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_TO_DELETE = 'fileToRemove.txt';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const remove = async () => {
  const filePath = join(dirName, FOLDER_NAME, FILE_TO_DELETE);
  try {
    await rm(filePath);
  } catch (error) {
    const errorMessage = error.code === ERROR_CODE ? ERROR_MESSAGE : error.message;
    throw new Error(errorMessage);
  }
};

await remove();
