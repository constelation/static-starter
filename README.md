# Constelation's Starter Static Site

A starter repo for a static site to be hosted on something like S3,  Github Pages, or Netlify

### Up and Running

```shell
$ git clone git@github.com:constelation/starter-static-site.git <YOUR_REPO_NAME>
$ cd <YOUR_REPO_NAME>
$ git remote set-url origin <YOUR_NEWLY_CREATED_GIT_REPO_URL>
$ git remote add upstream git@github.com:constelation/starter-static-site.git #for merging future updates
$ npm install
$ npm start
$ open http://localhost:8080
```

### Features

Render to html for fast initial page loads, then use react-router for SPA transitions

Auto-installs npm modules

Auto-imports of `React` and `Radium`. No need to import them in your components.

Hotloader for development

normalize.css and box-model reset

Similar dev experience to React Native
- Uses Radium for inline styles (syntax is very close to Native)
- `__DEV__` flag available in code

### Still to be added...
- [sitemap-webpack-plugin: Webpack plugin to generate a sitemap.](https://github.com/schneidmaster/sitemap-webpack-plugin)
- [favicons-webpack-plugin: Let webpack generate all your favicons and icons for you](https://github.com/jantimon/favicons-webpack-plugin)
- [react-router-to-array: Convert your react router component to an array with all static routes](https://github.com/alansouzati/react-router-to-array)
- [why-did-you-update: Puts your console on blast when React is making unnecessary updates.](https://github.com/garbles/why-did-you-update)

### Dev notes

__Please consult the [React Playbook](https://github.com/kylpo/react-playbook)__ for style, layout, architecture, and rules

#### Directory Layout
```
.
├── /assets
│   ├── /fonts/
│   ├── /images/
│   └── /videos/
|
├── /site                       # Your site-specific source code of the application
│   ├── /scenes/                # Components that are handled by a Navigator. Same as pages, views, etc for the app.
│   |   ├── /App/               # Root scene
│   ├── /shared/                # Shared components used in 2+ scenes
│   ├── /stores/                # **Optional** Responsible for you app state. Houses MobX actions and observables
│   ├── /utils/                 # **Optional** Helper js functions that are app and/or model aware
│   └── /entry.js               # Entry point for static-site-generator and client-side react-router
|
├── /lib                        # Your non-site-specific Components and functions
|
├── /node_modules/              # 3rd-party libraries and utilities
└── package.json                # The list of 3rd party libraries and utilities
```

#### Run targets
- `npm run clean` - Delete the generated `public/` folder
- `npm run reinstall` - Delete `node_modules`, then install them again
- `npm run build` - Generate static files in `public/` for dev
- `npm run build:dev` - Generate static files in `public/` for dev
- `npm run build:prod` - Generate static files in `public/` for production (minified)
- `npm run server:dev` - Start webpack-dev-server with hotloader enabled for hosting `public/`
- `npm run server:prod` - Host `public/` as a production server would
- `npm run dev` - `build:dev` then `server:dev`
- `npm run prod` - `build:prod` then `server:prod`
- `npm start` - `run dev`
- `npm deploy` - use `gh-pages` deploy `public/` to Github Pages

#### Updating repo with Starter-Static-Site changes after forking it
```shell
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```

### Recommended libs for taking this further
Again, consult the [Playbook](https://github.com/kylpo/react-playbook/tree/master/libs)

### Support
Tweet [@kylpo](https://twitter.com/kylpo)
