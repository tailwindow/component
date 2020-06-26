<template>
  <nav
    v-show="isSidebarOpen"
    class="w-screen sm:w-56 h-screen overflow-hidden flex-shrink-0 fixed sm:relative"
  >
    <div class="flex flex-1 flex-between h-screen flex-col w-screen sm:w-56">
      <div
        class="flex flex-shrink flex-col w-full px-16 sm:px-8 pt-6 sm:pt-3 pb-4 sm:pb-2 bg-gray-800 text-gray-200 text-center"
        @click.prevent="$store.dispatch('helper/toc/open')"
      >
        <router-link to="/">
          <logo />
          <p class="text-xs text-right uppercase">
            Free UI Component
          </p>
        </router-link>
      </div>
      <div class="flex-shrink bg-gray-800 p-4">
        <p class="p-2 bg-yellow-400 rounded-md text-center">
          <b>early access</b>, more component is coming
        </p>
      </div>
      <div class="flex flex-1 flex-col mb-16 sm:mb-0 bg-gray-800 scrolling-touch overflow-y-auto hide-overflow-bar">
        <hr class="mb-4 mt-1 bg-gray-100 mx-4 opacity-50">
        <button
          v-if="isTocOpen"
          tag="button"
          to="#"
          class="text-left text-white w-full mb-1 px-6 py-1 text-md sm:text-sm md:text-md font-light hover:text-blue-200"
          @click.prevent="chooseAllComponents()"
        >
          <i class="fas fa-caret-right" /> All
        </button>
        <template v-for="(componentGroup, index) in listGroups">
          <button
            v-if="isTocOpen"
            :key="index"
            tag="button"
            to="#"
            class="text-left text-white w-full mb-1 px-6 py-1 text-md sm:text-sm md:text-md font-light hover:text-blue-200"
            @click.prevent="chooseComponentGroup(componentGroup)"
          >
            <i class="fas fa-caret-right" /> {{ componentGroup.name | titlecase }}
          </button>
        </template>
        <div class="flex flex-row h-full sm:flex-col w-full px-2">
          <div
            v-if="!isTocOpen && listComponents.length > 0"
            class="w-1/2 sm:w-full px-2"
          >
            <div
              v-for="(component, index) in listComponents.slice(0, (listComponents.length + 1) / 2)"
              :key="'left-' + index"
              class="w-full mb-3 thumbnail shadow-md"
              @click.prevent="chooseComponent(component)"
            >
              <router-link
                tag="button"
                class="flex flex-col bg-white w-full p-2 self-center rounded-md shadow-md justify-center"
                :to="component.route"
              >
                <img
                  v-if="component.thumbnail"
                  class="object-center"
                  :src="component.thumbnail"
                  alt=""
                >
                <div
                  v-if="component.thumbnail"
                  class="flex flex-col justify-center w-full pt-1"
                >
                  <span class="text-xs font-hairline lowercase">{{ component.name }}</span>
                </div>
                <span
                  v-if="!component.thumbnail"
                  class="flex flex-col w-full justify-center my-2 px-1"
                >
                  <span class="text-sm">{{ component.name }}</span>
                  <span class="text-xs font-hairline lowercase">{{ component.group }}</span>
                </span>
              </router-link>
            </div>
          </div>
          <div
            v-if="!isTocOpen"
            class="w-1/2 sm:w-full px-2"
          >
            <div
              v-for="(component, index) in listComponents.slice((listComponents.length + 1) / 2)"
              :key="'right-' + index"
              class="w-full mb-3 thumbnail"
              @click.prevent="chooseComponent(component)"
            >
              <router-link
                tag="button"
                class="flex flex-col bg-white w-full p-2 self-center rounded-md shadow-md justify-center"
                :to="component.route"
              >
                <img
                  v-if="component.thumbnail"
                  class="object-center"
                  :src="component.thumbnail"
                  alt=""
                >
                <div
                  v-if="component.thumbnail"
                  class="flex flex-col justify-center w-full pt-1"
                >
                  <span class="text-xs font-hairline lowercase">{{ component.name }}</span>
                </div>
                <span
                  v-if="!component.thumbnail"
                  class="flex flex-col w-full justify-center my-2 px-1"
                >
                  <span class="text-sm">{{ component.name }}</span>
                  <span class="text-xs font-hairline lowercase">{{ component.group }}</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-shrink text-center h-16 bg-gray-800 text-gray-200 px-2 pb-2 fixed sm:relative bottom-0 w-full">
        <a
          v-if="isTocOpen"
          href="javascript:void(0)"
          class="flex-1 pt-4 flex flex-col"
          @click="$store.dispatch('helper/sidebar/toggle')"
        >
          <i class="fas fa-chevron-left text-xl text-white" />
          <span class="text-xs pt-1">CLOSE</span>
        </a>
        <a
          v-if="!isTocOpen"
          href="javascript:void(0)"
          class="flex-1 pt-4 flex flex-col"
          @click="$store.dispatch('helper/toc/open')"
        >
          <i class="fas fa-chevron-left text-xl text-white" />
          <span class="text-xs pt-1">BACK</span>
        </a>
        <a
          href="#"
          class="flex-1 pt-4 flex flex-col"
          @click="$store.dispatch('helper/toc/open')"
        >
          <i class="fas fa-book text-xl text-white" />
          <span class="text-xs pt-1">TOC</span>
        </a>
        <a
          href="https://www.tailwindow.com"
          class="flex-1 pt-4 flex flex-col"
        >
          <i class="fas fa-globe text-xl text-white" />
          <span class="text-xs pt-1">WEB</span>
        </a>
        <a
          href="https://github.com/tailwindow/component"
          target="_blank"
          class="flex-1 pt-4 flex flex-col"
        >
          <i class="fab fa-github text-xl text-white" />
          <span class="text-xs pt-1">GITHUB</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo'
import CollectionMixin from '@/mixins/collection'
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo
  },
  mixins: [
    CollectionMixin
  ],
  computed: {
    ...mapGetters('helper/sidebar', {
      isSidebarOpen: 'isOpen'
    }),
    ...mapGetters('helper/collection', {
      theme: 'theme',
      collection: 'collection',
      listGroups: 'groups',
      listComponents: 'components'
    }),
    ...mapGetters('helper/toc', {
      isTocOpen: 'isOpen'
    })
  },
  methods: {
    chooseAllComponents () {
      this.$store.dispatch('helper/toc/close')
      this.$store.dispatch('helper/collection/setComponents', this.collection)
      this.$router.push('/collection')
    },
    chooseComponentGroup (componentGroup) {
      this.$store.dispatch('helper/toc/close')
      this.$store.dispatch('helper/collection/setGroup', componentGroup)
      this.$store.dispatch('helper/collection/setComponents', this.$_collection_filterComponents(this.collection, componentGroup))
      this.$router.push(componentGroup.route)
    },
    chooseComponent (component) {
      this.$store.dispatch('helper/collection/setComponent', component)
      // Close sidebar if opened on phone
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      if (vw < 640) {
        this.$store.dispatch('helper/sidebar/close')
      }
    }
  }
}
</script>

<style>
.thumbnail {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
