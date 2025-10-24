const PFEFIX_LENGTH = 2;
const ARGS_STEP = 2;

const parseArgs = () => {
  const args = process.argv.slice(PFEFIX_LENGTH);
  const result = [];
  for (let i = 0; i < args.length; i += ARGS_STEP) {
    result.push(`${args[i].slice(2)} is ${args[i + 1]}`);
  }
  console.log(result.join(', '));
};

parseArgs();
