import hljs from 'highlight.js/lib/core.js'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import md from 'highlight.js/lib/languages/markdown'

const languages = { javascript, typescript, css, bash, json, xml, md }

Object.keys(languages).forEach((key) => {
  hljs.registerLanguage(key, languages[key])
})

export default hljs
