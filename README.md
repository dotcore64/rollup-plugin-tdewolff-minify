# rollup-plugin-tdewolff-minify

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]

> Import po files as i18next compatible json objects with rollup

## Install

```
$ npm install --save-dev rollup-plugin-tdewolff-minify
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
  plugins: [
    minify({
      maxConcurrency: 4, // by default this is the number of CPU cores
      customCliOptions: ['--my-custom-option=foo'],
    })
  ]
};
```

For more details on the options, please check https://github.com/JoakimCh/tdewolff-minify

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/rollup-plugin-tdewolff-minify/test/master?style=flat-square
[build]: https://github.com/dotcore64/rollup-plugin-tdewolff-minify/actions

[npm-badge]: https://img.shields.io/npm/v/rollup-plugin-tdewolff-minify.svg?style=flat-square
[npm]: https://www.npmjs.org/package/rollup-plugin-tdewolff-minify

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/rollup-plugin-tdewolff-minify/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/rollup-plugin-tdewolff-minify
