const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

const paths = [
  '/',
  '/other',
  // '/hello/',
  // '/world/'
];

module.exports = {

  entry: {
    'main': './site/index.js'
  },

  output: {
    filename: 'bundle.js',
    path: 'public',
    /* IMPORTANT! for StaticSiteGeneratorPlugin
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      // { test: /\.css$/, loader: "style" },
      // { test: /\.css$/, loader: "css", query: { localIdentName: "[name]-[local]--[hash:base64:5]" } },
      // { test: /\.eot$/, loader: "file" },
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      // { test: /\.json$/, loader: "json" },
      // { test: /\.(png|jpg)$/, loader: "url", query: { limit: 8192 } }, // Inline base64 URLs for <= 8K images
      // { test: /\.svg$/, loader: "url", query: { mimetype: "image/svg+xml" } },
      // { test: /\.ttf$/, loader: "url", query: { mimetype: "application/octet-stream" } },
      // { test: /\.(woff|woff2)$/, loader: "url", query: { mimetype: "application/font-woff" } },
    ],
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', paths, {
      // Properties here are merged into `locals`
      // passed to the exported render function
      // greet: 'Hello'
    }),
    new NpmInstallPlugin({
      dev: function(module, path) {
        return [
          "babel-preset-react-hmre",
          "webpack-dev-middleware",
          "webpack-hot-middleware",
        ].indexOf(module) !== -1;
      },
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
  ]

};
