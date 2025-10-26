import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';

const FOLDER_NAME = 'files';
const SOURCE_FILE = 'fileToCompress.txt';
const DEST_FILE = 'archive.gz';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathToSrc = join(dirName, FOLDER_NAME, SOURCE_FILE);
const pathToDest = join(dirName, FOLDER_NAME, DEST_FILE);

const compress = async () => {
  const srcStream = createReadStream(pathToSrc);
  const gzip = createGzip();
  const destStream = createWriteStream(pathToDest);
  try {
    await pipeline(srcStream, gzip, destStream);
    console.log('File compressed successfully.');
  } catch (error) {
    console.error(error.message);
  }
};

await compress();
