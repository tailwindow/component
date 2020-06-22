const state = {
  isOpen: true
}

const getters = {
  isOpen: state => {
    return state.isOpen
  }
}

const mutations = {
  'toggle' (state, payload) {
    if (state.isOpen) { state.isOpen = false } else { state.isOpen = true }
  },
  'open' (state) {
    state.isOpen = true
  },
  'close' (state) {
    state.isOpen = false
  }
}

const actions = {
  toggle (context) {
    context.commit('toggle')
  },
  open (context) {
    context.commit('open')
  },
  close (context) {
    context.commit('close')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
