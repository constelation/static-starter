const path = require('path')
const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
// const NpmInstallPlugin = require('npm-install-webpack-plugin')

// The routes that should generate *.html files for being served statically
const paths = [
  '/',
  '/other',
  '/notFound',
]

const plugins = [

  // Automatically loaded modules - means these imports are not needed in each file
  new webpack.ProvidePlugin({
    React: 'react',
    Col: 'constelation-Col',
    Button: 'constelation-Button',
    BackgroundImage: 'constelation-BackgroundImage',
    Row: 'constelation-Row',
    Flex: 'constelation-Flex',
    Text: 'constelation-Text',
    View: 'constelation-View',
    Style_: 'constelation-Style_',
    Event_: 'constelation-Event_',
    Animate_: 'constelation-Animate_',
  }),

  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEV || 'false')),
    __PROD__: JSON.stringify(JSON.parse(process.env.PROD || 'false')),

    // for production version of React
    'process.env.NODE_ENV': process.env.PROD === 'true' ? '"production"': '"development"',
  }),

  // Automatically `npm install` new imports and add to package.json
  // new NpmInstallPlugin(),

  // Does not send code with errors to bundle
  // Especially important for hot loader
  new webpack.NoErrorsPlugin(),
]

if (process.env.BUILD_SITE) {
  // Builds the static files
  plugins.push( new StaticSiteGeneratorPlugin( 'main', paths, {}, {} ))
}

module.exports = {

  plugins: plugins,

  entry: {
    'main': './site/entry.js',
  },

  output: {
    // Name of the js bundle
    filename: 'bundle.js',

    // Put generated files in this directory
    path: 'public',

    // When a loader does not inline, prefix their urls with publicPath
    publicPath: '/',

    // Required for StaticSiteGeneratorPlugin
    libraryTarget: 'umd',
  },

  resolve: {
    root: path.resolve('./'),
    alias: {
      shared: 'site/shared',
    },
  },


  module: {
    loaders: [
      // { test: /\.css$/, loader: "style" },
      // { test: /\.css$/, loader: "css", query: { localIdentName: "[name]-[local]--[hash:base64:5]" } },
      // { test: /\.eot$/, loader: "file" },
      {
        test: /\.js$/,
        loaders: ['babel'],
        // loaders: ['react-hot', 'babel'],
        // include: path.join(__dirname, 'site'),
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg)$/, loader: 'url', query: { limit: 8192 } }, // Inline base64 URLs for <= 8K images
      { test: /\.svg$/, loader: 'url', query: { mimetype: 'image/svg+xml' } },
      { test: /\.ttf$/, loader: 'url', query: { mimetype: 'application/octet-stream' } },
      { test: /\.(woff|woff2)$/, loader: 'url', query: { mimetype: 'application/font-woff' } },
    ],
  },

  devServer: {
    // webpack-dev-server uses generated index.html from `npm run build`
    contentBase: 'public',
  },
}
