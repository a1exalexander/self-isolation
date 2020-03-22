const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const seo = require('./seo');

const routes = ['/', '/about', '/post', '/info'];
if (process.env.NODE_ENV === 'production') {
  seo(routes);
}

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `data-view` attribute exists in the DOM.
      renderAfterDocumentEvent: 'render-event'
    })
  })
];

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/style.scss";'
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  }
};
