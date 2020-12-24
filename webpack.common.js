const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        javascript: "./app.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};