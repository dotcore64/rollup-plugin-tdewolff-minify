import { minify } from '@tdewolff/minify';

export default ({ code, options }) => minify('application/javascript', code, options ?? {});
