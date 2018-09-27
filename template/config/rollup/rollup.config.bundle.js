import
    * as fs from 'fs';

import
    resolve from 'rollup-plugin-node-resolve';
import
    commonjs from 'rollup-plugin-commonjs';
import
    camelcase from 'camelcase';

export default {
    input: './dist/esm/index.js',
    output: {
        file: './dist/browser/bundle.js',
        format: 'iife',
        name: camelcase(JSON.parse(fs.readFileSync('./package.json')).displayName),
        plugins: [
            resolve({
                module: true, // For a bundle, we need everything.
                main: true,
                customResolveOptions: {
                    moduleDirectory: './node_modules',
                    basedir: '.'
                },
                jail: './node_modules' // Since we are inputting from ./dist/browser.
            }),
            commonjs({
                include: ['node_modules/**']
            })
        ]
    },
    onwarn: (warning) => {
        if (warning.code === 'THIS_IS_UNDEFINED') { // Ignore friction with typescript output.
            return;
        }
        console.warn(warning.message);
    },
    intro: new Date()
};