import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import system from './modules/system'
import category from './modules/category'
import commodity from './modules/commodity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system,
    category,
    commodity
  },
  strict: true,
  plugins: [createLogger()]
})
