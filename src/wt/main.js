import { Worker } from 'worker_threads';
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';

const WORKER_FILE = 'worker.js';
const INIT_NUM = 10;

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathToWorker = join(dirName, WORKER_FILE);
const cpuCores = cpus().length;

const performCalculations = async () => {
  const allWorkers = Array.from({ length: cpuCores }, (_, index) => {
  return new Promise((resolve, reject) => {
      const worker = new Worker(pathToWorker, { workerData: INIT_NUM + index });
      worker.on('message', (msg) => {
        resolve(msg);
        worker.terminate();
      });
      worker.on('error', (error) => {
        reject(error);
        worker.terminate();
      })
    });
  });
  const resultsArr = await Promise.allSettled(allWorkers);
  const result = resultsArr.map((item) => ({
    status: item.status === 'fulfilled' ? 'resolved' : 'error',
    data: item.status === 'fulfilled' ? item.value : null,
  }));
  console.log(result);
};

await performCalculations();
