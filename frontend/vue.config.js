// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
  productionSourceMap: false
};
