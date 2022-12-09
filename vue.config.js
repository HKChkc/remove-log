// RemoveLogPlugin
const RemoveLogPlugin = require('./plugins/removeLogPlugin.js');
console.log(typeof RemoveLogPlugin);
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new RemoveLogPlugin()],
  },
};
