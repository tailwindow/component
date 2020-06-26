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
import CollectionMixin from './mixins/collection'

export default {
  components: {
    Header,
    BottomMenu,
    Menu
  },
  mixins: [
    CollectionMixin
  ],
  data () {
    return {
      path: this.$route.path
    }
  },
  computed: {
    ...mapGetters('helper/sidebar', {
      isSidebarOpen: 'isOpen'
    })
  },
  watch: {
    $route (to, from) {
      //
    }
  },
  async created () {
    const vendor = this.$_collection_getVendor()
    const collections = await this.$_collection_getCollection(vendor[0].toc)
    this.$store.dispatch('helper/collection/setTheme', vendor[0].name)
    this.$store.dispatch('helper/collection/setThemes', this.$_collection_filterThemes(collections))
    this.$store.dispatch('helper/collection/setGroups', this.$_collection_filterGroups(collections))
    this.$store.dispatch('helper/collection/setCollection', collections)
    this.$store.dispatch('helper/collection/setComponents', collections)
    this.$store.dispatch('helper/toc/close')
  },
  methods: {
  }
}
</script>
