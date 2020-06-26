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
      v-show="!isPreviewOpen"
      class="flex w-full shadow-lg"
      :class="{ 'max-w-screen-xs': device === 'xs', 'max-w-screen-sm': device === 'sm', 'max-w-screen-md': device === 'md', 'max-w-screen-lg': device === 'lg', '': device === 'xl' }"
    >
      <!-- Device Screen -->
      <iframe
        v-if="component !== undefined"
        v-show="!isPreviewOpen"
        id="preview"
        :src="component.url"
        frameborder="0"
        class="bg-white flex-grow"
      />
    </div>
  </main>
</template>

<script>
import '@/plugins/prism'
import Prism from 'prismjs'
import { mapGetters } from 'vuex'

export default {
  name: 'Collection',
  data () {
    return {
      copyText: 'Copy To Clipboard',
      path: this.$route.path || '/',
      rawHtml: ''
    }
  },
  computed: {
    ...mapGetters('helper/preview', {
      isPreviewOpen: 'isOpen'
    }),
    ...mapGetters('helper/collection', {
      collection: 'collection',
      component: 'component'
    }),
    ...mapGetters('helper/device', ['device'])
  },
  mounted () {
    this.collection.forEach(component => {
      if (component.route === this.$route.path) {
        this.$store.dispatch('helper/collection/setComponent', component)
      }
    })
    this.fetchPreview()
  },
  updated () {
    this.fetchPreview()
  },
  methods: {
    fetchPreview () {
      fetch(this.component.url).then(function (response) {
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
