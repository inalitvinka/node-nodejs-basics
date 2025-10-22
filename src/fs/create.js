import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFile, readFile, access } from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const pathToFile = join(__dirname, FOLDER_NAME, FILE_NAME)
  try {
    await writeFile(pathToFile, FILE_CONTENT, { flag: 'wx' });
  } catch (error) {
    console.log(error)
    throw new Error(ERROR_MESSAGE);
  }
  // try {
  //   await access(pathToFile);
  //   throw new Error(ERROR_MESSAGE);
  // } catch (error) {
  //   if (error.code === 'ENOENT') {
  //     await writeFile(pathToFile, FILE_CONTENT);
  //   } else {
  //     throw error;
  //   }
  // }
};

await create();
