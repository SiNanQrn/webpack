const loaderUtils = require("loader-utils");

module.exports = function (content) {
  let filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content,
  });
  filename = `images/${filename}`;
  console.log("打印filename", filename);
  this.emitFile(filename, content);
  return `module.exports = '${filename}'`;
};
module.exports.raw = true;
