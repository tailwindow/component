<template>
  <div
    v-if="!isSidebarOpen && !isPreviewOpen"
    class="flex bg-gray-800 text-white h-16 self-stretch text-center items-center pt-2"
  >
    <a
      href="javascript:void(0)"
      class="flex-1 flex flex-col"
      @click="$store.dispatch('helper/sidebar/toggle')"
    >
      <i class="fas fa-bars text-xl text-white" />
      <span class="text-xs pt-1">MENU</span>
    </a>
    <a
      href="https://www.tailwindow.com"
      class="flex-1 flex flex-col"
    >
      <i class="fas fa-globe text-xl text-white" />
      <span class="text-xs pt-1">WEB</span>
    </a>
    <a
      href="https://github.com/tailwindow/component"
      target="_blank"
      class="flex-1 flex flex-col"
    >
      <i class="fab fa-github text-xl text-white" />
      <span class="text-xs pt-1">GITHUB</span>
    </a>
    <!-- <a
      href="#"
      class="flex-1 flex flex-col"
    >
      <i class="fas fa-chevron-left text-xl text-white" />
      <span class="text-xs pt-1">PREV</span>
    </a> -->
    <!-- <a
      href="#"
      class="flex-1 flex flex-col"
    >
      <i class="fas fa-chevron-right text-xl text-white" />
      <span class="text-xs pt-1">NEXT</span>
    </a> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('helper/sidebar', {
      isSidebarOpen: 'isOpen'
    }),
    ...mapGetters('helper/preview', {
      isPreviewOpen: 'isOpen'
    })
  }
}
</script>
