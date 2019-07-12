const state = {
  boutiques: [],
  bookable: [],
  boutiqueSelected: "",
  cityBookable: []
};

const mutations = {
  'SET_BOUTIQUES' (state, boutiques) {
    state.boutiques = boutiques;
  },
  'SET_BOOKABLE' (state, boutiques) {
    state.bookable = boutiques;
  },
  'UPDATE_BOUTIQUE_SELECTED' (state, boutique) {
    state.boutiqueSelected = boutique;
  },
  'SET_CITY_BOOKABLE' (state, cities) {
    state.cityBookable = cities;
  }
};

const actions = {
  initBoutiques: ({commit}, boutiques) => {
    commit('SET_BOUTIQUES', boutiques);
  },
  initBookable: ({commit}, boutiques) => {
    commit('SET_BOOKABLE', boutiques);
  },
  updateBoutique: ({commit}, boutique) => {
    commit('UPDATE_BOUTIQUE_SELECTED', boutique);
  },
  initCities: ({commit}, cities) => {
    commit('SET_CITY_BOOKABLE', cities);
  }
}

const getters = {
  boutiques: state => {
    return state.boutiques;
  },
  bookable: state => {
    return state.bookable;
  },
  boutiqueSelected: state => {
    return state.boutiqueSelected
  },
  cityBookable: state => {
    return state.cityBookable
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}