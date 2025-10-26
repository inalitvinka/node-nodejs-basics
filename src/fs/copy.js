import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cp } from 'fs/promises';
import { pathExists } from '../utils/pathExists.mjs';

const FOLDER_NAME = 'files';
const DEST_FOLDER = 'files_copy';
const ERROR_MESSAGE = 'FS operation failed';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const srcPath = join(dirName , FOLDER_NAME);
const destPath = join(dirName , DEST_FOLDER);

const copy = async () => {
  const srcExisting = await pathExists(srcPath);
  const destExisting = await pathExists(destPath);

  if (!srcExisting || destExisting) {
    throw new Error(ERROR_MESSAGE);
  }
  await cp(srcPath, destPath, {recursive: true});
};

await copy();
