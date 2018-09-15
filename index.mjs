#! /usr/bin/env node --experimental-modules

import
    * as fs from 'fs';
import {
    join,
    dirname
} from 'path';

import
    commander from 'commander';
import 
    ncp from 'ncp';

const __dirname = dirname(new URL(import.meta.url).pathname), // https://stackoverflow.com/a/50052194
    {
        version 
    } = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'))),
    subName = (fileContents, name) => fileContents.replace(/\%name\%/g, name);

commander
    .version(version)
    .command('init <name>')
    .action((name) => {
        console.log(`Creating \`${name}\`...`);
        ncp.ncp(join(__dirname, 'template'), '.', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            let pkg = JSON.parse(fs.readFileSync('./package.json'));
            subName(pkg, name);
            fs.writeFileSync('./package.json', pkg);

            let readme = fs.readFileSync('README.md').toString();
            subName(readme, name);
            fs.writeFileSync('README.md', readme);

            console.log(`Project \`${name}\` created.`);
            console.log(`Don't forget to initialize a git repository if desired.`);
            });
    });

commander.parse(process.argv);
