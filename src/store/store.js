import Vue from 'vue'
import Vuex from 'vuex'

import boutiques from './modules/boutiques'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    boutiques
  }
});