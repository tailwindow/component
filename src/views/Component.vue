<template>
  <main class="bg-gray-100 overflow-hidden flex flex-grow justify-center w-full mx-auto">
    <pre
      v-show="isPreviewOpen"
      id="code-preview"
      class="flex flex-1 overflow-x-auto scroll-touch line-numbers language-markup"
    >
      <code
        id="code-container"
        class="flex-1"
        >
        <script
          type="text/plain"
          class="language-markup"
        />
      </code>
    </pre>
    <button
      v-show="isPreviewOpen"
      class="absolute right-0 mr-8 px-2 py-2 mt-4 rounded-full z-20 bg-opacity-25 text-opacity-75 bg-gray-600 text-white text-xs"
      @click="copyToClipboard"
    >
      <i class="fa fa-paste mx-1" />
      {{ copyText | uppercase }}
    </button>
    <!-- Device Layout Screen -->
    <div
      v-if="path != '/'"
      v-show="!isPreviewOpen"
      class="flex w-full shadow-lg"
      :class="{ 'max-w-screen-xs': device === 'xs', 'max-w-screen-sm': device === 'sm', 'max-w-screen-md': device === 'md', 'max-w-screen-lg': device === 'lg', '': device === 'xl' }"
    >
      <!-- Device Screen -->
      <iframe
        v-if="path != '/'"
        v-show="!isPreviewOpen"
        id="preview"
        :src="templatebaseUrl + '/template' + path + '/index.html'"
        frameborder="0"
        class="bg-white flex-grow"
      />
    </div>
  </main>
</template>

<script>
import '@/plugins/prism'
import { mapGetters } from 'vuex'
import Prism from 'prismjs'

export default {
  name: 'ComponentPreview',
  data () {
    return {
      templatebaseUrl: process.env.VUE_APP_TEMPLATE_BASE_URL,
      path: '/',
      copyText: 'Copy To Clipboard',
      rawHtml: '<div>Test</div>'
    }
  },
  computed: {
    ...mapGetters('helper/preview', {
      isPreviewOpen: 'isOpen',
      rawComponent: 'rawComponent'
    }),
    ...mapGetters('helper/device', ['device'])
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  },
  created () {
    this.path = this.$route.path
    this.append()
  },
  mounted () {
    this.path = this.$route.path
    this.append()
  },
  updated () {
    this.path = this.$route.path
    this.append()
  },
  methods: {
    append () {
      // Handle no page found
      // Should fix it with lazy load all component routes
      const array = this.path.split('/')
      if (array.length !== 5) {
        return this.$router.push('/404')
      }
      if (this.rawComponent[array[2]] === undefined) {
        return this.$router.push('/404')
      }
      if (this.rawComponent.tailwindcss[array[3]] === undefined) {
        return this.$router.push('/404')
      }
      if (!this.rawComponent.tailwindcss[array[3]].includes(array[4])) {
        return this.$router.push('/404')
      }
      fetch(process.env.VUE_APP_TEMPLATE_BASE_URL + '/template' + this.path + '/index.html').then(function (response) {
        // The API call was successful!
        return response.text()
      }).then(html => {
        this.rawHtml = html
        document.getElementById('code-container').innerHTML = '<script type="text/plain" class="language-markup">' + html
        Prism.highlightAll()
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err)
      })
    },
    copyToClipboard () {
      const el = document.createElement('textarea') // Create a <textarea> element
      el.value = this.rawHtml // Set its value to the string that you want copied
      el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
      el.style.position = 'absolute'
      el.style.left = '-9999px' // Move outside the screen to make it invisible
      document.body.appendChild(el) // Append the <textarea> element to the HTML document
      const selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : false // Mark as false to know no selection existed before
      el.select() // Select the <textarea> content
      document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el) // Remove the <textarea> element
      if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
      }
      this.copyText = 'Copied'
      setTimeout(() => {
        this.copyText = 'Copy To Clipboard'
      }, 3000)
    }
  }
}
</script>

<style>
/* remove default margin and border radius from prism style */
#code-preview {
  margin: 0 !important;
  border-radius: 0 !important;
}

#preview {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
