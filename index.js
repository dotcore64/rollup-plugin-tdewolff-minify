import Pool from 'tinypool';

export default function ({ maxThreads, minThreads, options } = {}) {
  const pool = new Pool({
    filename: new URL('worker.js', import.meta.url).href,
    ...maxThreads === undefined ? {} : { maxThreads },
    ...minThreads === undefined ? {} : { minThreads },
  });

  return {
    name: 'tdewolff-minify',

    async renderChunk(code/* , chunk, outputOptions */) {
      try {
        return {
          code: await pool.run({ code, options }),
          map: null, // https://github.com/tdewolff/minify/issues/25
        };
      } catch (e) {
        console.error(e.message); // eslint-disable-line no-console
        throw e;
      }
    },

    closeBundle() {
      return pool.destroy();
    },
  };
}
