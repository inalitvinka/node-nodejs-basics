import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';
import { pathExists } from '../utils/pathExists.mjs';

const FOLDER_NAME = 'files';
const prevName = 'wrongFilename.txt';
const newName = 'properFilename.md';
const ERROR_MESSAGE = 'FS operation failed';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const prevPath = join(dirName, FOLDER_NAME, prevName);
const newPath = join(dirName, FOLDER_NAME, newName);

const rename = async () => {
  const prevPathExisting = await pathExists(prevPath);
  const newPathExisting = await pathExists(newPath);
  if (!prevPathExisting || newPathExisting) {
    throw new Error(ERROR_MESSAGE);
  }
  await fs.rename(prevPath, newPath);
};

await rename();
