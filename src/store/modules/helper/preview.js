const state = {
  isOpen: false,
  url: null,
  // Theme (active)
  // ======================================
  // tailwindcss
  theme: null,
  // Themes
  // ======================================
  // ['tailwindcss', 'customcss']
  themes: [],
  // Group (active)
  // ======================================
  // alert
  group: null,
  // Groups
  // ======================================
  // ['alert', 'button', 'card']
  groups: [],
  // Component (active)
  // ======================================
  // alert-1
  component: null,
  // Components
  // ======================================
  // ['alert-1', 'alert-2', 'alert-3']
  components: [],
  // Raw Component Multidimensional Array
  // ======================================
  // rawComponent: {
  //   tailwindcss: {
  //     alert: ['alert-1', 'alert-2'],
  //     card: ['card-1', 'card-2']
  //   }
  // }
  rawComponent: {}
}

const getters = {
  isOpen: state => {
    return state.isOpen
  },
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
  rawComponent: state => {
    return state.rawComponent
  }
}

const mutations = {
  'open' (state, payload) {
    state.isOpen = payload
  },
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
  'setRawComponent' (state, payload) {
    state.rawComponent = payload
  }
}

const actions = {
  setUrl (context, payload) {
    context.commit('setUrl', payload)
  },
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
  setRawComponent (context, payload) {
    context.commit('setRawComponent', payload)
  },
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
