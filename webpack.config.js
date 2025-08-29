const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'faq-accordion/index': path.resolve(__dirname, 'src/faq-accordion/index.js'),
        'new-block/index': path.resolve(__dirname, 'src/new-block/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};
