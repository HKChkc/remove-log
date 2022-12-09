const pluginName = 'RemoveLogPlugin';
const fs = require('fs');
class RemoveLogPlugin {
  constructor(options) {}

  apply(compiler) {
    // console.log(Object.keys(compiler.hooks));
    // console.log('done', typeof compiler.hooks.done);
    compiler.hooks.done.tap(pluginName, stats => {
      console.log('webpack 构建正在启动！');
      try {
        this.removeAllLogs(stats);
      } catch (e) {
        throw e;
      }
    });
  }

  removeAllLogs(stats) {
    console.log(Object.keys(stats.compilation));
    const compilation = stats.compilation;
    console.log('compilation :>> ', compilation.assetsInfo);
    const { path, filename } = stats.compilation.options.output;
    // index.html
    // js/about.js
    // js/app.js
    // js/chunk-vendors.js

    for (let [key, val] of compilation.assetsInfo.entries()) {
      if (
        /.html$/.test(key) ||
        key.includes('chunk-vendors') ||
        key.includes('css')
      ) {
        continue;
      }
      const assetRealPath = `${path}/${key}`;
      console.log('assetRealPath', assetRealPath);
      const logReg = /console\.log\([^)]*\),?/g;
      fs.readFile(assetRealPath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log('data :>> ', data);
        // return;
        let newData = data.replace(logReg, '');
        // console.log('newData', newData);
        // return;
        fs.writeFile(assetRealPath, newData, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('remove all done');
        });
      });
    }
    console.log('path :>> ', path);
    console.log('filename', filename);
  }
}

module.exports = RemoveLogPlugin;
