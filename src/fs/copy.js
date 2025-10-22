import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cp, access } from 'fs/promises';

const FOLDER_NAME = 'files';
const DEST_FOLDER = 'files_copy';
const ERROR_MESSAGE = 'FS operation failed';
const ERROR_CODE = 'ENOENT';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const pathExists = async (path) => {
  let pathExisting = true;

  try {
    await access(path);
  } catch (error) {
    if (error.code === ERROR_CODE) {
      pathExisting = false;
    } else {
      console.error(error);
    }
  }
  return pathExisting;
} 

const copy = async () => {
  const srcPath = join(dirName , FOLDER_NAME);
  const destPath = join(dirName , DEST_FOLDER);
  const srcExisting = await pathExists(srcPath);
  const destExisting = await pathExists(destPath);

  if (!srcExisting || destExisting) {
    throw new Error(ERROR_MESSAGE);
  }
  await cp(srcPath, destPath, {recursive: true});
};

await copy();
