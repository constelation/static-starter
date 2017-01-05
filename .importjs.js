module.exports = {
  aliases: {
    React: 'react',
    Text: 'constelation-Text',
    View: 'constelation-View',
    Col: 'constelation-Col',
    Row: 'constelation-Row',
    Style_: 'constelation-Style_',
    Animate_: 'constelation-Animate_',
    Event_: 'constelation-Event_',
  },
  groupImports: true,
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '');
  }
}
