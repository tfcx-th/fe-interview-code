const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-doc-loader', 'css-file-loader', 'scss-file-loader']
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'path-loader',
                    options: {
                        limit: 200 * 1024
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}