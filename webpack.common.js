const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: "./table.js",
    // entry: {
    //     javascript: "./table.js"
    // },
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
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/react', '@babel/preset-env'],
                    plugins: ['@babel/proposal-class-properties']
                }
                // options: {
                //     presets: ["es2015"]
                // }
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