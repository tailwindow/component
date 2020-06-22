<template>
  <div id="app">
    <div class="flex flex-grow-0 w-screen max-h-screen min-h-screen items-stretch">
      <Menu />
      <div
        class="flex-1 flex-col sm:flex self-auto"
        :class="{ 'flex' : !isSidebarOpen, 'hidden' : isSidebarOpen }"
      >
        <Header />
        <router-view />
        <bottom-menu />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import BottomMenu from '@/components/BottomMenu'
import Menu from '@/components/Menu'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    BottomMenu,
    Menu
  },
  data () {
    return {
      path: this.$route.path
    }
  },
  computed: {
    ...mapGetters('helper/sidebar', {
      isSidebarOpen: 'isOpen'
    }),
    ...mapGetters('helper/preview', {
      previewComponent: 'component'
    })
  },
  watch: {
    $route (to, from) {
      this.path = to.path
      // Refreshed page
      const array = this.path.split('/')
      if (array.length === 5) {
        this.$store.dispatch('helper/preview/setUrl', this.path)
        this.$store.dispatch('helper/preview/setTheme', array[2])
        this.$store.dispatch('helper/preview/setGroup', array[3])
        this.$store.dispatch('helper/preview/setComponent', array[4])
        this.$store.dispatch('helper/toc/close')
        this.generateMenu(array[3])
      }
    }
  },
  mounted () {
    this.generateMenu()
  },
  methods: {
    generateMenu (group = null) {
      const app = require.context('../public/template/component', true, /\.html$/, 'sync').keys()
      const rawComponent = {}
      app.forEach(element => {
        const array = element.split('/')
        // array[1] = component theme
        // array[2] = component group
        // array[3] = component name
        // array[4] = html file

        // add to component collection if css framework doesn't exists
        if (array.length === 5) {
          if (!(array[1] in rawComponent)) {
            const obj = {}
            obj[array[2]] = [
              array[3]
            ]
            rawComponent[array[1]] = obj
          }

          // add to component collection if component group doesn't exists
          if (!(array[2] in rawComponent[array[1]])) {
            rawComponent[array[1]][array[2]] = [
              array[3]
            ]
          }

          // add to component collection if component doesn't exists
          if (rawComponent[array[1]][array[2]].indexOf(array[3]) === -1) {
            rawComponent[array[1]][array[2]].push(array[3])
          }
        }
      })
      this.$store.dispatch('helper/preview/setRawComponent', rawComponent)
      this.$store.dispatch('helper/preview/setThemes', Object.keys(rawComponent))
      // for now it's only tailwindcss on the list
      // it will change in the future to be dynamic
      this.$store.dispatch('helper/preview/setGroups', Object.keys(rawComponent.tailwindcss))
      if (group !== null) {
        // Handle no page found
        // Should fix it with lazy load all component routes
        if (rawComponent.tailwindcss[group] === undefined) {
          return this.$router.push('/404')
        }
        if (!rawComponent.tailwindcss[group].includes(this.previewComponent)) {
          return this.$router.push('/404')
        }
        this.$store.dispatch('helper/preview/setComponents', rawComponent.tailwindcss[group])
      }
    }
  }
}
</script>
