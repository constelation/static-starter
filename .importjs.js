module.exports = {
  aliases: {
    React: 'react',
    mobx: 'mobx',
    // constelation
    Text: 'constelation-text',
    Video: 'constelation-Video',
    TransitionGroupView: 'constelation-transition-group-view',
    ScrollView: 'constelation-scroll-view',
    View: 'constelation-view',
    Style_: 'constelation-style_',
    Event_: 'constelation-event_',
    Animate_: 'constelation-animate_',
    keydown: 'constelation-keydown-decorator',
    // shared
    // TODO: fill in the rest
  },
  groupImports: true,
  useRelativePaths({ pathToImportedModule, pathToCurrentFile }) {
    // relative iff there is an underscore (subcomponent) in path
    if (/_/.test(pathToImportedModule)) {
      return true;
    }
    return false;
  },
  importStatementFormatter({ importStatement }) {
    // no semicolons
    return importStatement.replace(/;$/, '');
  },
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    // shortcut for aliased paths
    if (moduleName.startsWith('site/')) {
      return moduleName.slice(5);
    }
    // Fall back to the original specifier. It's important that this function
    // always returns a string.
    return moduleName;
  }
}
