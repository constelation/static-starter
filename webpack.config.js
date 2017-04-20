// Credits: webpack2's offical docs and https://presentations.survivejs.com/advanced-webpack/

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

// The routes that should generate *.html files for being served statically
const entryFileLocation = './src/entry.client.js'

module.exports = function (env = {}) {
  const config = {

    //--Where to start bundling?--
    entry: {
      main: entryFileLocation,
      vendor: [
        'react',
        'react-dom',
        'glamor',
        'glamor-server',
        'glamor-react',
        'history',
        'lodash/pick',
        'lodash/omit',
      /*, 'lodash'*/], //comment out lodash because it'll vendor whole lodash lib
    },

    //--Where to output?--
    output: {
      // Note: currently unable to use [hash].[name].js since webpack is run twice for `prod` to gen html.
      // Hopefully static-site-generator will have a fix for code splitting so I can turn hashing back on for webpack long-term caching
      // filename: '[chunkhash].[name].js',
      filename: '[name].js',

      // Put generated files in this directory
      path: path.join(__dirname, './public'),

      // When a loader does not inline, prefix their urls with publicPath
      publicPath: '/',
    },

    //--How to resolve imports?--
    resolve: {
      modules: [
        path.join(__dirname, './'),
        'node_modules',
      ],
      alias: {
        shared: 'src/shared',
        stores: 'src/stores',
      },
    },

    //--How to transform from one form to another?--
    // Note: evaluates from bottom-to-top, right-to-left
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        // {variable: 'data'} needed to avoid a 'with' error:
        // http://stackoverflow.com/questions/18679422/issue-with-with-use-strict-and-underscore-js
        { test: /\.ejs$/, loader: 'ejs-loader', options: { variable: 'data' }},
        { test: /\.(png|jpg)$/, loader: 'url-loader', options: { limit: 8192 } }, // Inline base64 URLs for <= 8K images
        { test: /\.mp4$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'video/mp4' }},
        { test: /\.svg$/, loader: 'url-loader', options: { mimetype: 'image/svg+xml' } },
        { test: /\.ttf$/, loader: 'url-loader', options: { mimetype: 'application/octet-stream' } },
        { test: /\.(woff|woff2)$/, loader: 'url-loader', options: { mimetype: 'application/font-woff' } },
      ],
    },

    target: 'web',

    //--How to bundle?--
    // Note: evaluates from top-to-bottom (meaning first returned value is significant)
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: env.dev || false,
        __PROD__: env.prod || false,

        // Note: `process.env.NODE_ENV` is automatically set with `webpack -p`
        //       which is needed for build React in prod mode
      }),

      new webpack.ProvidePlugin({
        // Needed for ejs loader
        _: 'lodash',
      }),
    ],
  }

  // Settings required for generating the html files
  if (env.buildSite) {
    config.entry.main='./src/entry.static.js'
    // Required for StaticSiteGeneratorPlugin
    config.output.libraryTarget = 'umd'

    // Builds the static files
    config.plugins.push( new StaticSiteGeneratorPlugin({
      entry: 'main',

      // Rather than manually providing a list of paths, you can use the crawl option to automatically crawl your site
      crawl: true,

      // Note that this can be used in conjunction with the paths option to allow multiple crawler entry points:
      // paths: [
      //   '/', // required entry point for crawl if adding explicit paths
      //   '/notFound',
      //   // '/other',
      // ],
    }))
  }
  // Settings required for generating the js bundles
  else {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        // Note: use `names` below if I can ever use hashing.
        // see https://webpack.js.org/guides/code-splitting-libraries/#manifest-file
        name: 'vendor',
        // names: ['vendor', 'manifest'],

        minChunks: Infinity,
      })
      // new DuplicatePackageCheckerPlugin()
    )

    if (env.prod) {
      // 'source-map' to see full source (and inspect with source-map-explorer)
      // consider 'cheap-module-source-map' or null if you want to hide code in prod
      config.devtool = 'source-map'

      config.plugins.push(
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),

        // Minifier that understands es6 (vs Uglify)
        new BabiliPlugin(),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }

    if (env.dev) {
      // Include a comment with the request for every dependency
      config.output.pathinfo = true

      config.entry.main = [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://0.0.0.0:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        entryFileLocation,
      ]

      // Seems to work best in Chrome. See http://erikaybar.name/webpack-source-maps-in-chrome/
      config.devtool = 'eval-source-map'

      config.devServer = {
        // enable HMR on the server
        hot: true,

        // Show errors on page, like react-native
        overlay: true,

        // 404s will fallback to index.html
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',

        // webpack-dev-server uses generated index.html from `npm run build`
        contentBase: 'public',
      }

      config.plugins.push(
        new webpack.LoaderOptionsPlugin({
          minimize: false,
          debug: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()

        // Does not send code with errors to bundle
        // Especially important for hot loader
        // new webpack.NoEmitOnErrorsPlugin()
      )

      if (!env.buildJS) {
        // This is a non-static build, generate an html page for SPA dev
        config.plugins.push(
          new HtmlWebpackPlugin({
            inject: true,
            template: 'src/html.ejs',
          })
        )
      }

      // disable performance warnings in dev mode
      // it'll always be too big
      config.performance = {
        hints: false,
      }
    }
  }

  return config
}
