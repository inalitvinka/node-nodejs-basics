import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'EEXIST';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const pathToFile = join(__dirname, FOLDER_NAME, FILE_NAME)
  try {
    await writeFile(pathToFile, FILE_CONTENT, { flag: 'wx' });
  } catch (error) {
    const errorMessage = error.code === ERROR_CODE ? ERROR_MESSAGE : error.message;
    throw new Error(errorMessage);
  }
};

await create();
