import { compileTemplate } from '@vue/compiler-sfc'

export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
export function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

export function genInlineComponentText(template, script) {
  let compiled = ''
  script = script.trim()
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
  } else {
    script = 'const democomponentExport = {}'
  }
  script = script

  if (template) {
    compiled = compileTemplate({
      source: `<div>${template}</div>`,
      id: '0', // TODO: warning
      filename: 'demo',
      compilerOptions: {
        mode: 'function',
      },
    }).code
  }

  /**
   * script: sfc中script中的内容如下
   * const { defineComponent } from 'vue'
   * export default defineComponent({
   *   ...
   * })
   *
   * compiled: render函数
   * const {...} = vue
   * return function render() {
   *   ...
   * }
  */


  compiled = `${compiled.replace(
    'return function render',
    'function render',
  )}`

  const demoComponentContent = `(function() {
    ${compiled}
    ${script}
    return Vue.defineComponent({
      render,
      ...democomponentExport
    })
  })()`
  return demoComponentContent
}
