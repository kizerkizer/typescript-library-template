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

// https://stackoverflow.com/a/50052194
let __dirname = dirname(new URL(import.meta.url).pathname)

if (process.platform === 'win32') {

    // Remove starting back-slash.
    __dirname = __dirname.replace(/^\//gm, '');
}

const {
        version 
    } = JSON.parse(fs.readFileSync(join(__dirname, 'package.json')));

commander
    .version(version)
    .command('init <name>')
    .action((name) => {
        console.log(`Creating \`${name}\`...`);

        // Copy in the template.
        cl.cp('-r', join(__dirname, 'template'), '.');

        // Replace template variables.
        replaceVariableInFile('README.md', 'name', name);
        replaceVariableInFile('config/rollup/index.html', 'name', name);

        // Copy dotfiles in explicity as they are missed otherwise.
        for (let file of fs.readdirSync('./dotfiles')) {
            fs.writeFileSync(`.${file}`, fs.readFileSync(join('dotfiles', file)));
        }
        cl.rm('-r', './dotfiles');

        // Initialize packages.
        console.log('npm install...');
        cl.exec('npm install');

        // Initialize git.
        console.log('git init');
        cl.exec('git init');

        console.log(`Project \`${name}\` was created successfully.`);
        console.log(`A git repository was initialized.`);
    });

function replaceVariableInFile (filePath, variableName, variableSubstitution) {
    let file = fs.readFileSync(filePath).toString();
    file.replace(new RegExp(`%${variableName}%`, 'g'), variableSubstitution);
    fs.writeFileSync(filePath, file);
}

commander.parse(process.argv);