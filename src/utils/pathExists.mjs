import { access } from 'fs/promises';

const ERROR_CODE = 'ENOENT';

export const pathExists = async (path) => {
  let pathExisting = true;

  try {
    await access(path);
  } catch (error) {
    if (error.code === ERROR_CODE) {
      pathExisting = false;
    } else {
      throw error;
    }
  }
  return pathExisting;
}
