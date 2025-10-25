import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const FOLDER_NAME = 'files';
const SOURCE_FILE = 'archive.gz';
const DEST_FILE = 'fileToCompress.txt';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathToSrc = join(dirName, FOLDER_NAME, SOURCE_FILE);
const pathToDest = join(dirName, FOLDER_NAME, DEST_FILE); 

const decompress = async () => {
  const srcStream = createReadStream(pathToSrc);
  const destStream = createWriteStream(pathToDest);
  const gunzip = createGunzip();
  try {
    await pipeline(srcStream, gunzip, destStream);
    console.log('Decompression complete.')
  } catch (error) {
    console.error(error.message);
  }
};

await decompress();
