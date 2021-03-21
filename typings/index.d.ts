declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare type ComponentSize = 'xs' | 'sm' | 'md' | 'lg'

declare type Nullable<T> = T | null
