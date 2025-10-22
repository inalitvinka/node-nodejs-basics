import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';

const FOLDER_NAME = 'files';
const prevName = 'wrongFilename.txt';
const newName = 'properFilename.md';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const pathExists = async (path) => {
  let pathExisting = true;

  try {
    await fs.access(path);
  } catch (error) {
    if (error.code === ERROR_CODE) {
      pathExisting = false;
    } else {
      throw error;
    }
  }
  return pathExisting;
} 

const rename = async () => {
  const prevPath = join(dirName, FOLDER_NAME, prevName);
  const newPath = join(dirName, FOLDER_NAME, newName);
  const prevPathExisting = await pathExists(prevPath);
  const newPathExisting = await pathExists(newPath);
  if (!prevPathExisting || newPathExisting) {
    throw new Error(ERROR_MESSAGE);
  }
  await fs.rename(prevPath, newPath);
};

await rename();
