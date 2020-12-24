const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: 'reacttable.js',
        path: path.resolve(__dirname + '/dist_dev')
    }
});