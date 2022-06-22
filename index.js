import minify from '@tdewolff/minify';

export default function (options = {}) {
  return {
    name: 'tdewolff-minify',

    async renderChunk(code/* , chunk, outputOptions */) {
      try {
        return {
          code: await minify.string('application/javascript', code),
          map: null, // https://github.com/tdewolff/minify/issues/25
        };
      } catch (e) {
        console.error(e.message); // eslint-disable-line no-console
        throw e;
      }
    },
  };
}
