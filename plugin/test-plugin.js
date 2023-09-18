class TestPlugin {
  constructor() {
    console.log("打印constructor()");
  }

  /**
   *  1、webpack 会加载 webpack.config.js 中所有配置，此时就会new TestPlugin(),执行插件的 constructor
   *  2、webpack 会创建 compiler 对象
   *  3、遍历所有插件，调用 apply 方法
   *  4、执行剩下的编译流程（触发事件的 hooks 事件）
   */
  apply(compiler) {
    debugger;
    console.log("打印compiler", compiler);

    // 由文档所知 environments 是同步(SyncHook)钩子，所以要用 tap 注册
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("TestPlugin environments");
    });

    // 由文档所知 emit 是异步串行(AsyncSeriesHook)钩子，若写异步代码，则要用 tapAsync 注册
    compiler.hooks.emit.tap("TestPlugin", () => {
      console.log("TestPlugin emit() 111");
    });
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin.emit() 222");
        callback();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin.emit() 333");
          resolve();
        }, 1000);
      });
    });

    // 由文档所知 make 是异步并行(AsyncParallelHook)钩子
    compiler.hooks.make.tap("TestPlugin", () => {
      console.log("TestPlugin make() 111");
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("TestPlugin.seal");
      });
      setTimeout(() => {
        console.log("TestPlugin.make() 222");
        callback();
      }, 2000);
    });
    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin.make() 333");
          resolve();
        }, 3000);
      });
    });
  }
}
module.exports = TestPlugin;
