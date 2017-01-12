const path = require('path')
const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin");
// const NpmInstallPlugin = require('npm-install-webpack-plugin')


// The routes that should generate *.html files for being served statically
const paths = [
  '/',
  '/other',
  '/notFound',
]

module.exports = function (env = {}) {
  const config = {
    entry: {
      'main': env.buildSite ? './site/entry.js' : [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './site/entry.js'
      ],
    },

    output: {
      // Name of the js bundle
      filename: 'bundle.js',
      // filename: '[chunkhash].[name].js',

      // Put generated files in this directory
      path: path.join(__dirname, './public'),

      // When a loader does not inline, prefix their urls with publicPath
      publicPath: '/',

      // Required for StaticSiteGeneratorPlugin
      libraryTarget: 'umd',
    },

    resolve: {
      modules: [
        path.join(__dirname, './'),
        'node_modules',
      ],
      alias: {
        shared: 'site/shared',
        stores: 'site/stores',
      },
    },

    module: {
      rules: [
        // { test: /\.css$/, loader: "style" },
        // { test: /\.css$/, loader: "css", options: { localIdentName: "[name]-[local]--[hash:base64:5]" } },
        // { test: /\.eot$/, loader: "file" },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          // use: ['react-hot-loader', 'babel-loader'],
          // include: path.join(__dirname, 'site'),
          exclude: /node_modules/,
        },
        // { test: /\.json$/, loader: 'json-loader' },
        { test: /\.(png|jpg)$/, loader: 'url-loader', options: { limit: 8192 } }, // Inline base64 URLs for <= 8K images
        { test: /\.svg$/, loader: 'url-loader', options: { mimetype: 'image/svg+xml' } },
        { test: /\.ttf$/, loader: 'url-loader', options: { mimetype: 'application/octet-stream' } },
        { test: /\.(woff|woff2)$/, loader: 'url-loader', options: { mimetype: 'application/font-woff' } },
      ],
    },

    devtool: 'inline-source-map',

    devServer: {
      hot: true,
      // enable HMR on the server

      // webpack-dev-server uses generated index.html from `npm run build`
      contentBase: 'public',
    },
  }

  config.plugins = [

    new webpack.DefinePlugin({
      __DEV__: env.dev || false,
      __PROD__: env.prod || false,

      // for production version of React
      'process.env.NODE_ENV': env.prod ? '"production"': '"development"',
    }),

    // Automatically `npm install` new imports and add to package.json
    // new NpmInstallPlugin(),

    // Does not send code with errors to bundle
    // Especially important for hot loader
    new webpack.NoEmitOnErrorsPlugin(),
  ]

  if (env.buildSite) {
    // Builds the static files
    config.plugins.push( new StaticSiteGeneratorPlugin( 'main', paths, {}, {} ))
  }

  if (env.prod) {

    config.plugins.push(
      new BabiliPlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //   // compress: {
      //   //   warnings: true,
      //   // },
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }

  if (env.dev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin()
      // prints more readable module names in the browser console on HMR updates
    )

    // disable performance warnings in dev mode
    // it'll always be too big
    config.performance = {
      hints: false,
    }
  }

  return config
}
