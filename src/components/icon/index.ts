import featherIcons from 'feather-icons/dist/icons.json'
import Icon from './src/icon.vue'

export interface IconProps {
  icon: string
}

function loadIconSprite(): SVGSVGElement {
  const Namespace = 'http://www.w3.org/2000/svg'
  const symbolsStr = Object.keys(featherIcons).reduce((pre, curr) => {
    pre += `<symbol id="ka-icon-${curr}" viewBox="0 0 24 24">${featherIcons[curr]}</symbol>`
    return pre
  }, '')
  const container = document.createElementNS(Namespace, 'svg')
  container.innerHTML = `<defs>${symbolsStr}</defs>`

  return container
}

document.head.appendChild(loadIconSprite())

export default Icon
