module.exports = {
  aliases: {
    React: 'react',
    mobx: 'mobx',
    // constelation
    Video: 'constelation-Video',
    TransitionGroupView: 'constelation-transition-group-view',
    View: 'constelation-View',
    Col: 'constelation-Col',
    Row: 'constelation-Row',
    Flex: 'constelation-Flex',
    Style_: 'constelation-Style_',
    Event_: 'constelation-Event_',
    Animate_: 'constelation-Animate_',
    keydown: 'constelation-keydown-decorator',
  },
  groupImports: true,
  useRelativePaths: false,
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '');
  }
}
