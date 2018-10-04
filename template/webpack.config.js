const path = require('path');

module.exports = {
    entry: './dist/cjs/index.js',
    output: {
        path: path.join(__dirname, 'dist', 'browser'),
        filename: 'bundle.js'
    },
    devtool: 'source-map'
};