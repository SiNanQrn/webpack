// 异步 loader
module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    console.log("打印异步loader", content);
    callback(null, content, map, meta);
  }, 1000);
};
