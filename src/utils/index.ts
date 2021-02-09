import { inject, reactive } from 'vue'

export interface KabutackConfig {
  size: ComponentSize
}

export const useGlobalConfig: () => KabutackConfig = () => {
  return inject<KabutackConfig>('KabutackConfig', reactive({
    size: 'sm',
  }))
}
