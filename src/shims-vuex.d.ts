import { Store } from '@/store'
import { Subject } from './data/subject'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
