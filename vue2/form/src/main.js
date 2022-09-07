import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import 'uno.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './index.css'
// import VueDragTree from 'vue-drag-tree'
// import 'vue-drag-tree/dist/vue-drag-tree.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
// Vue.use(VueDragTree)
Vue.use(ViewUI);
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})


