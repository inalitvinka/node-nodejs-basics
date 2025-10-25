import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { stdin, stdout } from 'process';
import { EOL } from 'os';


const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, _, callback) {
      const transformedChunk = chunk
        .toString()
        .replace(/\r?\n$/, '')
        .split('')
        .reverse()
        .join('');

      this.push(transformedChunk + EOL);
      callback();
    }
  });
  try {
    await pipeline(stdin, transformStream, stdout);
  } catch (error) {
    console.error(error.message);
  }
};

await transform();
