const REQUIRED_PREFIX = 'RSS_';

const parseEnv = () => {
  const envVars = process.env;
  const filtered = Object.keys(envVars)
    .filter((key) => key.startsWith(REQUIRED_PREFIX))
    .map((key) => `${key}=${envVars[key]}`)
    .join('; ');
  console.log(filtered);
};

parseEnv();
