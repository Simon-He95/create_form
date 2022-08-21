import 'uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import { defineAsyncComponent } from 'vue'
const Counter = defineAsyncComponent(() => import('./components/Counter.vue'))
export { Counter }
