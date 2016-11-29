module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/bundle.js',
        sourceMapFilename: './dist/bundle.map'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
