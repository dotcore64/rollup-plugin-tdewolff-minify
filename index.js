import { Minify } from 'tdewolff-minify';

export default function (options = {}) {
  const minify = new Minify(options);

  return {
    name: 'tdewolff-minify',

    async renderChunk(code/* , chunk, outputOptions */) {
      try {
        return {
          code: await minify.content('js', code),
          map: null, // https://github.com/tdewolff/minify/issues/25
        };
      } catch (e) {
        const message = e.replace(/^ERROR: /, '');
        console.error(message); // eslint-disable-line no-console
        throw new Error(message);
      }
    },
  };
}
