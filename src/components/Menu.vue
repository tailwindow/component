<template>
  <nav
    v-show="isSidebarOpen"
    class="w-screen sm:w-56 h-screen overflow-hidden flex-shrink-0 fixed sm:relative"
  >
    <div class="flex flex-1 flex-between h-screen flex-col w-screen sm:w-56">
      <div
        class="flex flex-shrink flex-col flex-shrink w-full px-16 sm:px-8 pt-6 sm:pt-3 pb-4 sm:pb-2 bg-gray-800 text-gray-200 text-center"
        @click.prevent="$store.dispatch('helper/toc/open')"
      >
        <router-link to="/">
          <logo />
          <p class="text-xs text-right uppercase">
            Free UI Component
          </p>
        </router-link>
      </div>
      <div class="flex flex-1 flex-col mb-16 sm:mb-0 bg-gray-800 scrolling-touch overflow-y-auto hide-overflow-bar">
        <hr class="mb-4 mt-1 bg-gray-100 mx-4 opacity-50">
        <template v-for="(componentGroup, index) in listGroups">
          <button
            v-if="isTocOpen"
            :key="index"
            tag="button"
            to="#"
            class="text-left text-white w-full mb-1 px-6 py-1 text-xl sm:text-sm font-light"
            @click.prevent="chooseComponentGroup(componentGroup)"
          >
            {{ componentGroup | titlecase }}
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
                class="flex bg-white w-full p-2 self-center rounded-md shadow-md"
                :to="'/component/tailwindcss/'+group+'/'+component"
              >
                <img
                  class="flex-1 object-center"
                  :src="'/template/component/tailwindcss/'+group+'/'+component+'/thumb.svg'"
                  alt=""
                >
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
                class="flex bg-white w-full p-2 self-center rounded-md shadow-md"
                :to="'/component/tailwindcss/'+group+'/'+component"
              >
                <img
                  class="flex-1 object-center"
                  :src="'/template/component/tailwindcss/'+group+'/'+component+'/thumb.svg'"
                  alt=""
                >
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters('helper/sidebar', {
      isSidebarOpen: 'isOpen'
    }),
    ...mapGetters('helper/preview', {
      group: 'group',
      listGroups: 'groups',
      component: 'component',
      listComponents: 'components',
      rawComponent: 'rawComponent'
    }),
    ...mapGetters('helper/toc', {
      isTocOpen: 'isOpen'
    })
  },
  methods: {
    chooseComponentGroup (componentGroup) {
      this.$store.dispatch('helper/preview/setComponents', this.rawComponent.tailwindcss[componentGroup])
      this.$store.dispatch('helper/preview/setGroup', componentGroup)
      this.$store.dispatch('helper/toc/close')
      this.$router.push('/component/tailwindcss/' + componentGroup)
    },
    chooseComponent (component) {
      this.$store.dispatch('helper/preview/setGroup', this.group)
      this.$store.dispatch('helper/preview/setComponent', component)
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
