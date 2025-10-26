import { fork } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'script.js';
const ERROR_MESSAGE = 'Error:';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathToFile = join(dirName, FOLDER_NAME, FILE_NAME);

const spawnChildProcess = async (args) => {
  const child = fork(pathToFile, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (error) => {
    console.error(ERROR_MESSAGE, error);
  });
  
  child.stderr.on('data', (chunk) => {
    console.error(ERROR_MESSAGE, chunk.toString());
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['Lamborghini', 'Ferrari', 'Maserati', 'Rolls-Royce'] );
