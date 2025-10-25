import { dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { stdout } from 'process';
import { EOL } from 'os';


const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';
const LINE_FEED = '\n';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const read = async () => {
  const pathToFile = join(dirName, FOLDER_NAME, FILE_NAME);
  const stream = createReadStream(pathToFile);
  // stream.pipe(stdout);
  // await new Promise((resolve, reject) => {
  //   stream.on('end', resolve);
  //   stream.on('error', reject);
  // });
  // stdout.write(LINE_FEED);
  try {
    await pipeline(stream, stdout, { end: false });
    stdout.write(EOL);
  } catch (error) {
    console.error(error.message);
  }
};

await read();
