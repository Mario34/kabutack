import { defineComponent, h, ref } from 'vue'
import { Popper } from '/@/components/popper'

import type { PropType } from 'vue'
import type { TriggerType, Placement } from '../index'

export default defineComponent({
  name: 'KaTooltip',
  components: {
    Popper,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top',
    },
    triggerType: {
      type: String as PropType<TriggerType>,
      default: 'hover',
    },
    showDelay: {
      type: Number,
      default: 200,
    },
    hideDelay: {
      type: Number,
      default: 200,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const popperRef = ref<typeof Popper | null>(null)
    const update = () => {
      popperRef.value?.update?.()
    }
    return {
      popperRef,
      update,
    }
  },
  render() {
    const {
      isShow,
      content,
      placement,
      triggerType,
      showDelay,
      hideDelay,
      disabled,
      $slots,
    } = this
    const PopperProps = {
      isShow,
      content,
      placement,
      triggerType,
      showDelay,
      hideDelay,
      disabled,
      className: 'ka-tooltip',
      ref: 'popperRef',
    }

    return h(
      Popper,
      PopperProps,
      {
        default: () => $slots.default?.(),
        content: () => $slots.content ? $slots.content() : content,
      },
    )
  },
})
