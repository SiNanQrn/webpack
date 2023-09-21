class AnalyzePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzePlugin", (compilation) => {
      const assets = Object.entries(compilation.assets);
      let sources = `# 分析打包资源 \n| 资源名称 | 大小 |\n| --- | --- |`;

      assets.forEach(([filename, file]) => {
        sources += `\n|${filename} | ${Math.round(file.size() / 1024)}kb|`;
      });

      // 添加资源
      compilation.assets["analyze.md"] = {
        source() {
          return sources;
        },
        size() {
          return sources.length;
        },
      };
    });
  }
}

module.exports = AnalyzePlugin;
