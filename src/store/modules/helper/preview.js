const state = {
  isOpen: false
}

const getters = {
  isOpen: state => {
    return state.isOpen
  }
}

const mutations = {
  'open' (state, payload) {
    state.isOpen = payload
  }
}

const actions = {
  open (context) {
    context.commit('open', true)
  },
  close (context) {
    context.commit('open', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
