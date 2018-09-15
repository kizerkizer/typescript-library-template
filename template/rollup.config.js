import * as fs from 'fs';

import resolve from 'rollup-plugin-node-resolve';
import camelcase from 'camelcase';

export default {
    input: './bin/esm/index.js',
    output: {
        file: './bin/browser/index.js',
        format: 'umd',
        name: camelcase(JSON.parse(fs.readFileSync('./package.json')).displayName),
        plugins: [
            resolve()
        ]
    },
    external: ['tslib'],
    onwarn: (warning) => {
        if (warning.code === 'THIS_IS_UNDEFINED') { // friction with typescript output
            return;
        }
        console.warn(warning.message);
    }
}