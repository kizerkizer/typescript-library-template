#! /usr/bin/env node --experimental-modules

import
    * as fs from 'fs';
import {
    join,
    dirname
} from 'path';

import
    commander
from 'commander';

import
    _default
from './instantiators/default.mjs';
import
    purets
from './instantiators/purets.mjs';

// https://stackoverflow.com/a/50052194
let __dirname = dirname(new URL(import.meta.url).pathname)

if (process.platform === 'win32') {

    // Remove starting back-slash.
    __dirname = __dirname.replace(/^\//gm, '');
}

const {
        version 
    } = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'))),
    instantiators = {
        '_default': _default,
        'purets': purets
    }; /*fs.readdirSync(join(__dirname, 'instantiators'))
        .reduce(((object, filename) => (object[filename] = true, object)), {});*/

commander
    .version(version)
    .command('init <name> [template]')
    .action((name, template) => {
        console.log(`Creating \`${name}\`...`);
        if (!template || !instantiators[template]) {
            template = '_default';
        }
        template(name, __dirname);
    });

commander.parse(process.argv);