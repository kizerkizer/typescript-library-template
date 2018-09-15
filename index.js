#!/usr/bin/env node

const fs = require('fs'),
    path = require('path');

const arguments = require('commander');

const pkg = require('package.json');

const cwd = process.cwd();

arguments
    .version(pkg.version)
    .command('init <name>')
    .action(() => {
        const fileNames = await fs.readdir('./template');
        fileName.
    })