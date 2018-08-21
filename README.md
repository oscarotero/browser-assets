# Browser assets

Simple utility to copy files from `node_modules` to a public directory in order to be loaded by the browser.

```sh
npm install browser-assets
```

## Why?

Because sometimes I want to use some packages installed with npm in the browser, but loaded as native ES6 modules, so I don't need webpack, rollup or any other module bundler, simply copy these files in other directory.

## How it works?

You only need to define the package names you want to use and the destination folder. This tool searches them in `node_modules` and read their `package.json` files to get the list of the files that should be copied.

The field used in `package.json` is the first found of the following, in this order of priority:

* `module`
* `modules`
* `modules.root`
* `files`
* `browser`
* `main`

If all files of a package are located in the same subdirectory, it strip that subdirectory. It's common to use subdirectories like `src`, `dist`, etc.

## Usage

```js
const assets = require('browser-assets');

const packages = ['package1', '@vendor/package2', 'package3'];
const dest = 'public/vendor';

assets(packages, dest)
	.then(files => console.log('The following vendor files were copied:', files));
```

---

### References

* [In Defense of `.js`](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)
* [`browser` in `package.json`](https://docs.npmjs.com/files/package.json#browser)
* [`files` in `package.json`](https://docs.npmjs.com/files/package.json#files)
* [`main` in `package.json`](https://docs.npmjs.com/files/package.json#main)
