// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import ElementUi from 'element-ui'
import Vue from 'vue'
import App from './App'
// import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './index.css'
// import VueDragTree from 'vue-drag-tree'
import 'vue-drag-tree/dist/vue-drag-tree.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
// Vue.use(VueDragTree)
Vue.use(ViewUI);
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})
