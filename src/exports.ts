import 'uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import { defineAsyncComponent } from 'vue'

const Form = defineAsyncComponent(() => import('./components/Form.vue'))

export { Form }
