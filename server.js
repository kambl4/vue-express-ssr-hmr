const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const template = fs.readFileSync('./index.html', 'utf-8');
const serverBundle =  require('./build/dist/vue-ssr-server-bundle.json');
const clientManifest =  require('./build/dist/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');
const renderer = createBundleRenderer(serverBundle, {
  basedir: path.resolve(__dirname, './dist'),
  runInNewContext: false,
  template,
  clientManifest
});
const webpack = require('webpack');
const webpackConfig = require('./build/webpack.client.config');
const compiler = webpack(webpackConfig);

server.use('/dist', express.static(path.join(__dirname, '.build/dist')));
server.use('/img', express.static(path.join(__dirname, './static/img')));
server.use('/css', express.static(path.join(__dirname, './static/css')));
server.use(require("webpack-dev-middleware")(compiler, {
  logLevel: 'info', publicPath: webpackConfig.output.publicPath
}));
server.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

server.get('*', (req, res) => {
  const context = {
    url: req.url, 
    title: 'Vue SSR',
    meta: `
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    `,
    link: `
      <link rel="stylesheet" href="/css/buefy.min.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    `
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(3005)