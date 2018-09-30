import
    * as fs from 'fs';

import
    resolve from 'rollup-plugin-node-resolve';
import
    camelcase from 'camelcase';

export default {
    input: './dist/esm/index.js',
    output: {
        file: './dist/browser/index.js',
        format: 'umd',
        name: camelcase(JSON.parse(fs.readFileSync('./package.json')).displayName),
        plugins: [
            resolve({
                module: false // Each module should be bundled separately and made importable at runtime?
            })
        ]
    },
    external: ['tslib'],
    onwarn: (warning) => {
        if (warning.code === 'THIS_IS_UNDEFINED') { // Ignore friction with ts output.
            return;
        }
        console.warn(warning.message);
    },
    intro: new Date()
};