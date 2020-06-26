const state = {
  url: null,
  // Theme (active)
  // ===========================================
  // tailwindcss
  theme: null,
  // Themes
  // ===========================================
  // ['tailwindcss', 'customcss']
  themes: [],
  // Group (active)
  // ===========================================
  // alert
  group: null,
  // Groups
  // ===========================================
  // ['alert', 'button', 'card']
  groups: [],
  // Component (active)
  // ===========================================
  // alert-1
  component: {
    name: null,
    path: null,
    url: null
  },
  // Array of components from choosen group
  // ===========================================
  // ['alert-1', 'alert-2', 'alert-3']
  components: [],
  // Array components
  // This filled when user choose specific group
  // ============================================
  // [ 'alert-1', 'alert-2' ]
  collection: []
}

const getters = {
  url: state => {
    return state.url
  },
  theme: state => {
    return state.theme
  },
  themes: state => {
    return state.themes
  },
  group: state => {
    return state.group
  },
  groups: state => {
    return state.groups
  },
  component: state => {
    return state.component
  },
  components: state => {
    return state.components
  },
  collection: state => {
    return state.collection
  }
}

const mutations = {
  'setUrl' (state, payload) {
    state.url = payload
  },
  'setTheme' (state, payload) {
    state.theme = payload
  },
  'setThemes' (state, payload) {
    state.themes = payload
  },
  'setGroup' (state, payload) {
    state.group = payload
  },
  'setGroups' (state, payload) {
    state.groups = payload
  },
  'setComponent' (state, payload) {
    state.component = payload
  },
  'setComponents' (state, payload) {
    state.components = payload
  },
  'setCollection' (state, payload) {
    state.collection = payload
  }
}

const actions = {
  setTheme (context, payload) {
    context.commit('setTheme', payload)
  },
  setThemes (context, payload) {
    context.commit('setThemes', payload)
  },
  setGroup (context, payload) {
    context.commit('setGroup', payload)
  },
  setGroups (context, payload) {
    context.commit('setGroups', payload)
  },
  setComponent (context, payload) {
    context.commit('setComponent', payload)
  },
  setComponents (context, payload) {
    context.commit('setComponents', payload)
  },
  setCollection (context, payload) {
    context.commit('setCollection', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
