import { string, config } from '@tdewolff/minify';

export default ({ code, options }) => {
  if (options !== undefined) {
    config(options);
  }

  return string('application/javascript', code);
};
