import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cp, access } from 'fs/promises';

const FOLDER_NAME = 'files';
const DEST_FOLDER = 'files_copy';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const dirExisting = async (dirPath) => {
  let directoryExisting = true;

  try {
    await access(dirPath);
  } catch (error) {
    if (error.code === ERROR_CODE) {
      directoryExisting = false;
    } else {
      console.error(error);
    }
  }
  return directoryExisting;
} 

const copy = async () => {
  const srcPath = join(dirName , FOLDER_NAME);
  const destPath = join(dirName , DEST_FOLDER);
  const srcExisting = await dirExisting(srcPath);
  const destExisting = await dirExisting(destPath);

  if (!srcExisting || destExisting) {
    throw new Error(ERROR_MESSAGE);
  }
  await cp(srcPath, destPath, {recursive: true});
};

await copy();
