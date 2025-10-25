import { createReadStream } from 'fs';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';
const HASH_ALGO = 'sha256';
const OUTPUT_FORMAT = 'hex';
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const calculateHash = async () => {
  const filePath = join(dirName, FOLDER_NAME, FILE_NAME);
  const hash = createHash(HASH_ALGO);
  try {
    await pipeline(createReadStream(filePath), hash);
    const result = hash.digest(OUTPUT_FORMAT);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

await calculateHash();
