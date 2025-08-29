const path = require('path');
const { merge } = require('webpack-merge');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = merge(defaultConfig, {
    entry: {
        'faq-accordion/index': path.resolve(__dirname, 'src/faq-accordion/index.js'),
        'faq-accordion/view': path.resolve(__dirname, 'src/faq-accordion/view.js'),
        'new-block/index': path.resolve(__dirname, 'src/new-block/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
});