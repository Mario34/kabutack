import { nextTick } from 'vue'
import { Toast } from '../index'

describe('Toast runtime', () => {
  test('render title', async () => {
    const { elId } = Toast({
      title: 'Toast runtime render title',
    })
    await nextTick()
    expect(document.querySelector(`#${elId} .ka-toast__main-title`)?.textContent)
      .toContain('Toast runtime render title')
  })

  test('ctx close', async () => {
    const { close, elId } = Toast({
      title: 'Toast runtime ctx close',
    })
    await nextTick()
    expect(document.querySelector(`#${elId} .ka-toast__main-title`)?.textContent)
      .toContain('Toast runtime ctx close')
    close()
    await nextTick()
    expect(document.querySelector(`#${elId}`)).toBeFalsy()
  })
})
