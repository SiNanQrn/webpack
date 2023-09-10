/**
 * @param {*} content 是buffer数据
 */
module.exports = function (content) {
  console.log("打印raw loader", content);
  return content;
};
module.exports.raw = true; // 开启 Raw Loader,可以接收原始的 Buffer
