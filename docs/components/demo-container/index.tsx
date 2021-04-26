import { defineComponent, ref, onMounted, nextTick, computed } from 'vue'
import hljs from '../../utils/highlight.js'
import './index.scss'

import 'highlight.js/scss/atom-one-dark.scss'

const DemoContainer = defineComponent({
  name: 'DemoContainer',
  setup(_props, ctx) {
    const {
      slots: {
        default: _default,
        source,
        highlight,
      },
    } = ctx
    const descriptionRef = ref(null)
    const highlightRef = ref(null)
    const elmHeight = ref()
    const isExpanded = ref(false)
    const highlightHeight = computed(() => isExpanded.value ? elmHeight.value : 0)
    const controlText = computed(() => isExpanded.value ? 'close' : 'code')

    const switchExpand = () => {
      isExpanded.value = !isExpanded.value
    }

    onMounted(() => {
      nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)')
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        elmHeight.value = (highlightRef.value as any)?.offsetHeight || 0
      })
    })

    return () => (
      <div class={[
        'demo-container',
        {
          'is-open': isExpanded.value
        }
      ]}
      >
        {source && (
          <div class='demo-container__source'>
            {source()}
          </div>
        )}
        <div class={[
          'demo-container__meta',
          {

          }
        ]}>
          {
            _default && (
              <div
                class='demo-container__description'
                ref={descriptionRef}
              >
                {_default()}
              </div>
            )
          }
          {highlight && (
            <div
              class='demo-container__highlight-box'
              style={{
                height: `${highlightHeight.value}px`,
              }}
            >
              <div
                class={[
                  'demo-container__highlight',
                  // 'atom-one-light',
                  'one-dark-pro',
                ]}
                ref={highlightRef}
              >
                {highlight()}
              </div>
            </div>
          )}
        </div>
        <div class='demo-container__control'>
          <div class='demo-container__control-btn'>
            <ka-icon icon='codepen' /> CodePen
          </div >
          <div class='demo-container__control-btn source-code' onClick={switchExpand}>
            <ka-icon icon={isExpanded.value ? 'chevrons-up' : 'code'} />
            {controlText.value}
          </div >
        </div >
      </div >
    )
  },
})

export default DemoContainer
