# Kylpo's Starter Static Site

A starter repo for a static site to be hosted on something like S3,  Github Pages, or Netlify

### Up and Running

```shell
$ git clone https://github.com/Instrument/instrument-reactnative-bp.git MyApp
$ npm install
$ npm start
$ open http://localhost:8080
```

### Features

- Render to html for fast initial page loads, then use react-router for SPA transitions
- Auto-installs npm modules
- Auto-imports of `React` and `Radium`. No need to import them in your components.
- Hotloader for development
- normalize.css and box-model reset
- Similar dev experience to React Native
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
├── /tools/                     # Build automation scripts and utilities
├── /node_modules/              # 3rd-party libraries and utilities
└── package.json                # The list of 3rd party libraries and utilities
```

### Recommended libs for taking this further
- [revalidate: Elegant and composable validations](https://github.com/jfairbank/revalidate)
- [victory: A collection of composable React components for building interactive data visualizations](https://github.com/FormidableLabs/victory)
- [velocity-react: React components for Velocity.js](https://github.com/twitter-fabric/velocity-react)
- [react-aim: Determine the cursor aim for triggering mouse events.](https://github.com/gabrielbull/react-aim)

### How To Deploy to Github
use gh-pages. More info to come.

### Support
Tweet [@kylpo](https://twitter.com/kylpo)
