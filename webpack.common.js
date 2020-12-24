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
            }
        ]
    }
};