const path = require('path')
const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// const NpmInstallPlugin = require('npm-install-webpack-plugin')


// The routes that should generate *.html files for being served statically
const paths = [
  '/',
  '/other',
  '/notFound',
]

const scope = {
  // window:{},
  webpackJsonp: function(){},
  // ,document:{
  //     getElementsByTagName:getElementsByTagName,
  //     createElement:createElement
}

module.exports = function (env = {}) {
  const config = {
    entry: {
      vendor: ['react'],
      main: (env.buildSite || env.buildJS) ? './site/entry.js' : [
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
      // filename: '[chunkhash].[name].js',
      filename: '[name].js',
      // filename: 'bundle.js',
      // filename: '[chunkhash].[name].js',
      // filename: '[hash].[name].js',

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

    target: 'web',

    // prod: source-map to see full source (and inspect with source-map-explorer)
    //       consider 'cheap-module-source-map' if you want to hide code in prod
    // dev:  add sourcemap to bundle
    devtool: env.prod ? 'source-map' : 'inline-source-map',

    devServer: {
      // enable HMR on the server
      hot: true,

      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',

      // webpack-dev-server uses generated index.html from `npm run build`
      contentBase: 'public',
    },
  }

  config.plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor', // Specify the common bundle's name.
    //   // name: "commons",
    //   // (the commons chunk name)
    //
    //   // filename: "commons.js",
    //   filename: "vendor.js",
    //   // (the filename of the commons chunk)
    //
    //   minChunks: Infinity,
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),

    new webpack.DefinePlugin({
      __DEV__: env.dev || false,
      __PROD__: env.prod || false,

      // for production version of React
      // 'process.env.NODE_ENV': env.prod ? JSON.stringify('production'): JSON.stringify('development'),
    }),

  ]

  if (env.buildSite) {
    // Builds the static files
    config.plugins.push( new StaticSiteGeneratorPlugin( 'main', paths, {}, scope ))
  }
  else {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',

        // minChunks: Infinity,
        // (with more entries, this ensures that no other module
        //  goes into the vendor chunk)
      })
    )


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
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (env.dev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates


      // Does not send code with errors to bundle
      // Especially important for hot loader
      new webpack.NoEmitOnErrorsPlugin()
    )

    // disable performance warnings in dev mode
    // it'll always be too big
    config.performance = {
      hints: false,
    }
  }
  }

  return config
}
