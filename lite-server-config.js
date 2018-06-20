var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
  server : {
    "baseDir" : "./dist/cloudman-ui",
    middleware : {
      1 : proxyMiddleware('/cloudman/api', {
        target : 'http://localhost:8000',
        changeOrigin : true
      // for vhosted sites, changes host header to match to target's host
      }),

      2 : fallbackMiddleware({
        index : '/index.html',
        verbose : true
      })
    }
  }
};
