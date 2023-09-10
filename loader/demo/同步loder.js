// 同步 loader

const { mode } = require("../../webpack.config");

// 方式一
// mode.exports = function (content, map, meta) {
//   return content;
// };
// 方式二
module.exports = function (content, map, meta) {
  /**
   * @param null 代表是否有错误
   * @param content 处理后的内容
   * @param map source-map 继续传递 source-map
   * @param meta 给下一个 loader 传递参数
   */
  console.log("打印同步loader", content);
  this.callback(null, content, map, meta);
};
