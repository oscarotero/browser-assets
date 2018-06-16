const resolvePkg = require('resolve-pkg');
const path = require('path');
const globby = require('globby');
const fs = require('fs-extra');

async function package(name, dest) {
    const dir = resolvePkg(name);

    if (!dir) {
        throw new Error(`The package ${name} was not found`);
    }

    const fromFiles = await getPackageFiles(dir);
    const toFiles = stripBasePath(fromFiles);

    return Promise.all(
        fromFiles.map((fromFile, i) => {
            const from = path.join(dir, fromFile);
            const to = path.join(dest, name, toFiles[i]);

            return fs.copy(from, to);
        })
    );
}

async function copy(packages, dest = 'vendor') {
    await fs.remove(dest);

    return Promise.all(packages.map(name => package(name, dest)));
}

function getPackageFiles(dir) {
    const packageFile = path.join(dir, 'package.json');
    const package = require(packageFile);

    if (package.files) {
        return globby(package.files, { cwd: dir });
    }

    if (package.browser) {
        return Promise.resolve([package.browser]);
    }

    if (package.main) {
        return Promise.resolve([package.main]);
    }

    throw new Error(
        `No "files", "browser" or "main" fields found in ${packageFile}`
    );
}

function stripBasePath(files) {
    while (files[0].includes(path.sep)) {
        const base = files[0].split(path.sep, 2).shift() + path.sep;

        if (files.every(file => file.startsWith(base))) {
            files = files.map(file => file.substr(base.length));
        } else {
            break;
        }
    }

    return files;
}

module.exports = copy;
