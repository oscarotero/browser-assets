# Browser assets

Simple utility to copy files from `node_modules` to a public directory in order to be loaded by the browser.

```sh
npm install browser-assets
```

## Why?

Because sometimes I want to use some packages installed with npm in the browser, but loaded as native ES6 modules, so I don't need webpack, rollup or any other module bundler, simply copy these files in a directory.

## How it works?

You only need to define the package names you want to use and the destination folder. This tool will search them in `node_modules` and read the `package.json` file to get the list of the files that must be copied. It will use the first entry found of `module`, `files`, `browser` and `main` in this order or priority.

If all files of a package are located in the same subdirectory, it strip that subdirectory. It's common to use subdirectories like `src`, `dist`, etc.

## Usage

```js
const assets = require('browser-assets');

assets(['package1', '@vendor/package2', 'package3'], 'public/vendor')
	.then(() => console.log('Vendor files copied!'))
```
