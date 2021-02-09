import Config from 'markdown-it-chain'
import anchorPlugin from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-toc-done-right'
import slugify from 'slugify'
import containers from './containers'
import overWriteFenceRule from './fence'
const config = new Config()

config.options
  .html(true)
  .end()

  .plugin('anchor')
  .use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify,
      permalink: true,
      permalinkSymbol: '#',
    },
  ])
  .end()

  .plugin('toc')
  .use(tocPlugin, [
    {
      level: 2,
      slugify: slugify,
      containerId: 'doc-toc',
      containerClass: 'doc-toc',
      listClass: 'doc-toc__list',
      itemClass: 'doc-toc__item',
      linkClass: 'doc-toc__link',
      format(x, encode) {
        return `- <span>${encode(x)}</span>`
      },
    },
  ])
  .end()

  .plugin('containers')
  .use(containers)
  .end()

const md = config.toMd()
overWriteFenceRule(md)

export default md
