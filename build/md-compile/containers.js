import mdContainer from 'markdown-it-container'

export default md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-container>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--md-demo: ${content}:md-demo-->
        `
      }
      return '</demo-container>'
    },
  })

  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
}
