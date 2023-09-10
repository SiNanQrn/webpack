/**
 * loader本质就是一个函数
 * 当 webpack 解析资源时，会调用响应的 loader 去处理
 * loader 接收文件内容作为参数，再返回文件内容
 * @param {string} content 文件内容
 * @param {string} map SourceMap
 * @param {string} meta 别的 loader 传递的数据
 */
module.exports = function (content, map, meta) {
  console.log("打印", content);
  return content;
};
