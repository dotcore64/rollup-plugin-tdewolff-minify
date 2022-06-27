# rollup-plugin-tdewolff-minify

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]

> Import po files as i18next compatible json objects with rollup

## Install

```
$ npm install --save-dev rollup-plugin-tdewolff-minify @tdewolff/minify
```

## Usage

Compile using:

```js
// rollup.config.js
import minify from 'rollup-plugin-tdewolff-minify';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [minify()]
};
```

## Options

### `minThreads`
Type: `number`
Default: `undefined`

Sets the minimum number of threads that are always running for this thread pool. The default is based on the number of available CPUs.

### `maxThreads`
Type: `number`
Default: `undefined`

Sets the maximum number of threads that are running for this thread pool. The default is based on the number of available CPUs.

### `options`
Type: `object`
Default: `undefined`

Minify options, see https://github.com/tdewolff/minify/tree/master/bindings/js#usage.

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/rollup-plugin-tdewolff-minify/test/master?style=flat-square
[build]: https://github.com/dotcore64/rollup-plugin-tdewolff-minify/actions

[npm-badge]: https://img.shields.io/npm/v/rollup-plugin-tdewolff-minify.svg?style=flat-square
[npm]: https://www.npmjs.org/package/rollup-plugin-tdewolff-minify

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/rollup-plugin-tdewolff-minify/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/rollup-plugin-tdewolff-minify
