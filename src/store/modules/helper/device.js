const state = {
  device: 'xl',
  width: ''
}

const getters = {
  device: state => {
    return state.device
  },
  width: state => {
    return state.width
  }
}

const mutations = {
  'update' (state, payload) {
    if (payload === 'xl') {
      state.width = '1280px'
    } else if (payload === 'lg') {
      state.width = '1024px'
    } else if (payload === 'md') {
      state.width = '768px'
    } else if (payload === 'sm') {
      state.width = '640px'
    } else {
      state.width = '320px'
    }
    state.device = payload
  }
}

const actions = {
  update (context, payload) {
    if (!['xl', 'lg', 'md', 'sm', 'xs'].includes(payload)) {
      payload = 'xl'
    }
    context.commit('update', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
