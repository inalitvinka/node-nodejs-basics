import { createReadStream } from 'fs';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';
const HASH_ALGO = 'sha256';
const OUTPUT_FORMAT = 'hex';
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const calculateHash = async () => {
  const filePath = join(dirName, FOLDER_NAME, FILE_NAME);
  const stream = createReadStream(filePath);
  const hash = createHash(HASH_ALGO);
  stream.on('data', (chunk) => {
    hash.update(chunk);
  });
  stream.on('end', () => {
    const result = hash.digest(OUTPUT_FORMAT);
    console.log(result);
  });
  stream.on('error', (error) => {
    throw error;
  });
};

await calculateHash();
