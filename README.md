# Browser assets

Simple utility to copy files from `node_modules` to a public directory in order to be loaded by the browser.

```sh
npm install browser-assets
```

## Why?

Because sometimes I want to use some packages installed with npm in the browser, but loaded as native ES6 modules, so I don't need webpack, babel or any other transpiler/packer/whatever, simply copy these files and that's all.

## How it works?

You only need to define the packages you want to install and the destination folder. This tool will search the `package.json` file of each package and copy the files defined in [files field](https://docs.npmjs.com/files/package.json#files).

If all files of a package are located in the same subdirectory, it strip that subdirectory. It's common to use subdirectories like `src`, `dist`, etc.

## Usage

```js
const assets = require('browser-assets');

assets(['package1', '@vendor/package2', 'package3'], 'public/vendor')
	.then(() => console.log('Vendor files copied!'))
```
