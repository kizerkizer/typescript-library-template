#! /usr/bin/env node --experimental-modules

import
    * as fs from 'fs';
import {
    join,
    dirname
} from 'path';

import
    cl from 'shelljs';
import
    commander from 'commander';
import 
    copydir from 'copy-dir';

// https://stackoverflow.com/a/50052194
let __dirname = dirname(new URL(import.meta.url).pathname)

if (process.platform === 'win32') {

    // Remove starting back-slash.
    __dirname = __dirname.replace(/^\//gm, '');
}

const {
        version 
    } = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'))),
    subName = (fileContents, name) => { return fileContents.replace(/\%name\%/g, name) };

commander
    .version(version)
    .command('init <name>')
    .action((name) => {
        console.log(`Creating \`${name}\`...`);

        try {
            copydir.sync(join(__dirname, 'template'), '.')
        } catch (error) {
            console.log('Failed to copy files into current directory. Permissions issue?');
            process.exit();
        }

        let pkg = fs.readFileSync('package.json').toString();
        pkg = subName(pkg, name);
        fs.writeFileSync('package.json', pkg);

        let readme = fs.readFileSync('README.md').toString();
        readme = subName(readme, name);
        fs.writeFileSync('README.md', readme);

        let index = fs.readFileSync('config/rollup/index.html').toString();
        index = subName(index, name);
        fs.writeFileSync('config/rollup/index.html', index);

        for (let file of fs.readdirSync('./dotfiles')) {
            fs.writeFileSync(`.${file}`, fs.readFileSync(join('dotfiles', file)));
        }

        cl.rm('-r', './dotfiles');

        console.log('npm install...');
        cl.exec('npm install');

        console.log('git init');
        cl.exec('git init');

        console.log(`Project \`${name}\` was created successfully.`);
        console.log(`A git repository was initialized.`);
    });

commander.parse(process.argv);

