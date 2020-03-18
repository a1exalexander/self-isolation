module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/self-isolation/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/style.scss";'
      }
    }
  }
}
