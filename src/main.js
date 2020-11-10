import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production' || false) {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()

global.__onLiveSyncCore = function () {
  var frame = require('@nativescript/core').Frame.topmost()
  if (frame) {
    if (frame.currentPage && frame.currentPage.modal) {
      frame.currentPage.modal.closeModal()
    }

    if (frame.currentPage) {
      frame.currentPage.addCssFile(
          // require('@nativescript/core').getCssFileName() // Causing crash for HMR changes with the CopyWebpackPlugin bug
      )
    }
  }
}
