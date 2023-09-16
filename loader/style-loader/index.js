module.exports = function (content) {
  // const script = `
  //   let styleEle = document.createElement('style')
  //   styleEle.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEle);
  // `;
  // return script;
};

/**
 * 由于 css-loader 处理后是带有 js 代码的，而当交给 style-loader 处理时，它不支持，
 * 故 style-loader 需要写 pitch 方法，这样就会先执行 style-loader 中的 pitch 方法，再执行 css-loader ，最后执行 style-loader
 * remainingReq -  /Users/sinan/Documents/MyCode/webpack/node_modules/css-loader/dist/cjs.js!/Users/sinan/Documents/MyCode/webpack/src/css/index.css
 **/
module.exports.pitch = function (remainingReq) {
  console.log("打印remainingReq", remainingReq);
  // 1. 将 remainingReq 中绝对路径变成相对路径
  const relactivePath = remainingReq
    .split("!")
    .map((absolutePath) => {
      return this.utils.contextify(this.context, absolutePath);
    })
    .join("!");
  // console.log("打印relactivePath", relactivePath);  // ../../node_modules/css-loader/dist/cjs.js!./index.css

  // 2. 引入 css-loader 处理后资源，且创建 style 标签，将内容 插入页面中
  const script = `
    import style from "!!${relactivePath}";
    let styleEle = document.createElement('style');
    styleEle.innerHTML = style;
    document.head.appendChild(styleEle);
  `;
  return script;
};
