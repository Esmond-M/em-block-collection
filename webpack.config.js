const path = require('path');
const { merge } = require('webpack-merge');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = merge(defaultConfig, {
    entry: {
        'faq-accordion/index': path.resolve(__dirname, 'src/faq-accordion/index.js'),
        'faq-accordion/view': path.resolve(__dirname, 'src/faq-accordion/view.js'),
        'carousel/index': path.resolve(__dirname, 'src/carousel/index.js'),
        'carousel/view': path.resolve(__dirname, 'src/carousel/view.js'),
        'posts-grid/index': path.resolve(__dirname, 'src/posts-grid/index.js'),
        'posts-grid/view': path.resolve(__dirname, 'src/posts-grid/view.js'),
        'spacer-divider/index': path.resolve(__dirname, 'src/spacer-divider/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
});