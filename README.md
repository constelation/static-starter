# Kylpo's Starter Static Site

A starter repo for a static site to be hosted on something like S3,  Github Pages, or Netlify

### Up and Running

```shell
$ git clone git@github.com:kylpo/starter-static-site.git MySite
$ cd MySite
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
- `npm run build` - Generate static files in `public/` for dev
- `npm run build:dev` - Generate static files in `public/` for dev
- `npm run build:prod` - Generate static files in `public/` for production (minified)
- `npm run server:dev` - Start webpack-dev-server with hotloader enabled for hosting `public/`
- `npm run server:prod` - Host `public/` as a production server would
- `npm run prod` - `build:prod` then `server:prod`
- `npm start` - `build:dev` then `server:dev`
- `npm deploy` - use `gh-pages` deploy `public/` to Github Pages

### Recommended libs for taking this further
Again, consult the [Playbook](https://github.com/kylpo/react-playbook/tree/master/libs)

### Support
Tweet [@kylpo](https://twitter.com/kylpo)
