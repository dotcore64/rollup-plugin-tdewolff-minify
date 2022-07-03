import { rollup } from 'rollup';
import { use, expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import minify from 'rollup-plugin-tdewolff-minify';

use((await import('chai-as-promised')).default); // eslint-disable-line unicorn/no-await-expression-member

describe('minify', () => {
  it('should minify', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [minify()],
    });
    const result = await bundle.generate({ format: 'cjs' });
    expect(result.output).to.have.lengthOf(1);
    const [output] = result.output;
    expect(output.code).to.equal(
      '"use strict";window.a=5,window.a<3&&console.log(4)\n',
    );
    expect(output.map).to.equal(null);
  });

  it('should destroy the pool when closing the bundle', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [minify()],
    });
    await bundle.generate({ format: 'cjs' });
    return bundle.close();
  });

  it('minify multiple outputs', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [minify()],
    });

    const [bundle1, bundle2] = await Promise.all([
      bundle.generate({ format: 'cjs' }),
      bundle.generate({ format: 'es' }),
    ]);
    const [output1] = bundle1.output;
    const [output2] = bundle2.output;

    expect(output1.code).to.equal(
      '"use strict";window.a=5,window.a<3&&console.log(4)\n',
    );
    expect(output2.code).to.equal('window.a=5,window.a<3&&console.log(4)\n');
  });

  it('should accept minify options', async () => {
    {
      const bundle = await rollup({
        input: 'test/fixtures/keep-var.js',
        plugins: [minify({ options: { 'js-keep-var-names': true } })],
      });
      const result = await bundle.generate({ format: 'esm' });
      expect(result.output).to.have.lengthOf(1);
      const [output] = result.output;
      expect(output.code).to.equal('x=function(){var twice;twice++,console.log(twice)}\n');
    }

    {
      const bundle = await rollup({
        input: 'test/fixtures/keep-var.js',
        plugins: [minify({ options: { 'js-keep-var-names': false } })],
      });
      const result = await bundle.generate({ format: 'esm' });
      expect(result.output).to.have.lengthOf(1);
      const [output] = result.output;
      expect(output.code).to.equal('x=function(){var e;e++,console.log(e)}\n');
    }
  });

  it('minify esm module', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/plain-file.js',
      plugins: [minify()],
    });
    const result = await bundle.generate({ format: 'esm' });
    expect(result.output).to.have.lengthOf(1);
    const [output] = result.output;
    expect(output.code).to.equal('const foo="bar";console.log(foo)\n');
  });

  it('minify cjs module', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/plain-file.js',
      plugins: [minify()],
    });
    const result = await bundle.generate({ format: 'cjs' });
    expect(result.output).to.have.lengthOf(1);
    const [output] = result.output;
    expect(output.code).to.equal('"use strict";const foo="bar";console.log(foo)\n');
  });

  it('throw error on minify fail', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/failed.js',
      plugins: [
        {
          renderChunk: () => ({ code: 'var = 1' }),
        },
        minify(),
      ],
    });
    return expect(bundle.generate({ format: 'esm' }))
      .to.be.rejectedWith(Error, /unexpected = in binding on line 1 and column 5/);
  });
});
