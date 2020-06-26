<template>
  <header class="h-16 w-full bg-gray-100 shadow-md mb-1 flex-shrink-0">
    <div class="flex justify-between ">
      <div class="flex flex-col item self-center flex-grow flex-no-wrap break-words m-4">
        <span class="text-sm">{{ component ? component.name : '' | titlecase }}</span>
        <span class="text-xs font-hairline lowercase">{{ component ? component.group : '' | titlecase }}</span>
      </div>
      <div class="flex justify-between">
        <div class="flex">
          <div class="my-4 pt-1 px-2 mx-2 hidden sm:flex">
            <a
              href="javascript:void(0)"
              class="px-2 mx-1 shadow rounded-md hidden sm:flex flex-col text-center"
              :class="{ 'shadow-lg' : device === 'xs' }"
              @click="$store.dispatch('helper/device/update', 'xs')"
            >
              <i class="fal fa-mobile-alt" />
              <span class="text-xs">xs</span>
            </a>
            <a
              href="javascript:void(0)"
              class="px-2 mx-1 shadow rounded-md hidden sm:flex flex-col text-center"
              :class="{ 'shadow-lg' : device === 'sm' }"
              @click="$store.dispatch('helper/device/update', 'sm')"
            >
              <i class="fal fa-mobile" />
              <span class="text-xs">sm</span>
            </a>
            <a
              href="javascript:void(0)"
              class="px-2 mx-1 shadow rounded-md hidden md:flex flex-col text-center"
              :class="{ 'shadow-lg' : device === 'md' }"
              @click="$store.dispatch('helper/device/update', 'md')"
            >
              <i class="fal fa-tablet fa-rotate-90" />
              <span class="text-xs">md</span>
            </a>
            <a
              href="javascript:void(0)"
              class="px-2 mx-1 shadow rounded-md hidden lg:flex flex-col text-center"
              :class="{ 'shadow-lg' : device === 'lg' }"
              @click="$store.dispatch('helper/device/update', 'lg')"
            >
              <i class="fal fa-laptop" />
              <span class="text-xs">lg</span>
            </a>
            <a
              href="javascript:void(0)"
              class="px-2 mx-1 shadow rounded-md hidden xl:flex flex-col text-center"
              :class="{ 'shadow-lg' : device === 'xl' }"
              @click="$store.dispatch('helper/device/update', 'xl')"
            >
              <i class="fal fa-tv" />
              <span class="text-xs">xl</span>
            </a>
          </div>
          <div
            v-if="component"
            class="mr-5"
          >
            <button
              v-if="!isPreviewOpen"
              class="flex text-xs border-2 border-gray-500 leading-none rounded-full py-2 px-2 mt-4 focus:border-red-100 items-center"
              @click="$store.dispatch('helper/preview/open')"
            >
              <i class="fal fa-code text-gray-700 pr-1" />
              CODE
            </button>
            <button
              v-if="isPreviewOpen"
              class="flex text-xs border-2 border-gray-500 leading-none rounded-full py-2 px-2 mt-4 focus:border-red-100 items-center"
              @click="$store.dispatch('helper/preview/close')"
            >
              <i class="far fa-eye text-gray-700 pr-1" />
              PREVIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('helper/preview', {
      isPreviewOpen: 'isOpen'
    }),
    ...mapGetters('helper/collection', {
      component: 'component'
    }),
    ...mapGetters('helper/device', {
      device: 'device'
    })
  }
}
</script>
