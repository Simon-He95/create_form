import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
