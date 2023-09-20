const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugin/test-plugin");
const AnnotationPlugin = require("./plugin/annotation-plugin");
const ClearPlugin = require("./plugin/clear-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    // clean: true,
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
        loader: "./loader/clean-log-loader.js",
      },
      // {
      //   test: /\.js$/,
      //   loader: "./loader/author-loader/index.js",
      //   options: {
      //     author: "SiNan",
      //   },
      // },
      {
        test: /\.js$/,
        loader: "./loader/babel-loader/index.js",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "./loader/file-loader/index.js",
        type: "javascript/auto", // 解决图片重复打包问题
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: ["./loader/style-loader/index.js", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // new TestPlugin(),
    new AnnotationPlugin({
      author: "SN",
    }),
    new ClearPlugin(),
  ],
};
