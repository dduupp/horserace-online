const configureAPI = require('./src/server/configure');

module.exports = {
  devServer: {
    before: configureAPI
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_constants.scss";`
      }
    }
  }
};
