const state = {
  boutiques: []
};

const mutations = {
  'SET_BOUTIQUES' (state, boutiques) {
    state.boutiques = boutiques;
  }
};

const actions = {
  initBoutiques: ({commit}, boutiques) => {
    commit('SET_BOUTIQUES', boutiques);
  }
}

const getters = {
  boutiques: state => {
    return state.boutiques;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}