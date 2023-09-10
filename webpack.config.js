const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [
        //   "./loader/demo/pitching Loader.js",
        //   "./loader/demo/异步loder.js",
        //   "./loader/demo/同步loder.js",
        //   "./loader/demo/raw loader.js",
        // ],
        loader:"./loader/clean-log-loader.js"
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
