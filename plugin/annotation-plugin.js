class AnnotationPlugin {
  constructor(option = {}) {
    console.log("打印", option);
    this.options = option;
  }

  apply(compiler) {
    // 需要处理文件
    const extensions = ["js", "css"];
    compiler.hooks.emit.tap("AnnotationPlugin", (compilation) => {
      debugger;
      // console.log("打印compilation", compilation);
      // console.log("打印compilation", compilation.assets);
      // 通过过滤只保留需要处理的文件
      const assetPaths = Object.keys(compilation.assets).filter((item) => {
        let res = item.split(".");
        let fileType = res[res.length - 1];
        return extensions.includes(fileType);
      });

      console.log("打印assetPaths", assetPaths);

      assetPaths.forEach((item) => {
        const assets = compilation.assets[item];
        const source = `
        /*
         * author:${this.options.author}
         */\n${assets.source()}
        `;
        compilation.assets[item] = {
          // 资源内容
          source() {
            return source;
          },
          // 资源大小
          size() {
            return source.length;
          },
        };
      });
    });
  }
}

module.exports = AnnotationPlugin;
