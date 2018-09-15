#!/usr/bin/env node

const path = require('path');
const assets = require('./index');
const argv = require('yargs-parser')(process.argv.slice(2), {
    default: {
        dest: null,
    }
});

try {
    if (!argv.dest) {
        throw new Error('--dest argument is mandatory');
    }
    if (!argv._.length) {
        throw new Error('There is no packages to copy');
    }

    assets(argv._, argv.dest)
        .then(() => console.log(green('All packages copied!')))
        .catch(err => console.error(red(err.message)))
} catch (err) {
    console.error(red(err.message));
}


function red(message) {
    return '\u001b[' + 31 + 'm' + message + '\u001b[' + 39 + 'm';
}

function green(message) {
    return '\u001b[' + 32 + 'm' + message + '\u001b[' + 39 + 'm';
}
