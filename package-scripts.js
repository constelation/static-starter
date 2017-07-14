module.exports = {
  scripts: {
    precommit: 'yarn run lint',
    prepush: 'yarn run lint',
    flow: 'flow',
    flowCoverage: 'flow-coverage-report -i \'src/**/*.js\'',
    lint: 'eslint src lib',
    lintFix: 'eslint --fix src lib',
    reinstall: 'rimraf node_modules && npm install',
    sourceExplorer: 'nps buildJs.prod && source-map-explorer public/main.js public/main.js.map',
    qr: 'local-url-qrcode 8080',
    clean: 'rimraf public',
    buildHtml: {
      default: 'webpack --env.buildSite',
      dev: 'nps "buildHtml --env.dev --progress"',
      prod: 'nps "buildHtml --env.prod -p --progress"',
    },
    buildJs: {
      dev: 'webpack --env.dev --env.buildJS --progress',
      prod: 'webpack --env.prod -p --progress',
    },
    server: {
      dev: 'webpack-dev-server --env.dev --host 0.0.0.0',
      prod: 'serve public/ -p 8080',
    },
    prod: 'nps clean && nps buildHtml.prod && nps buildJs.prod && nps qr && nps server.prod',
    dev: 'nps clean && nps buildHtml.dev && nps buildJs.dev && nps qr && nps server.dev',
    default: 'nps clean && nps buildJs.dev && nps qr && nps server.dev',
    deploy: 'nps clean && nps buildHtml.prod && nps buildJs.prod && rimraf docs && cp -r public docs',
  },
}
