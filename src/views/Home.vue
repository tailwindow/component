<template>
  <main class="flex flex-1 flex-col items-center justify-center">
    <div class="flex flex-col w-64">
      <logo :is-dark="true" />
      <p class="text-xs text-right uppercase">
        Free UI Component
      </p>
    </div>
    <div class="max-w-screen-sm mx-12 my-12">
      <p>
        All the components currently available are created using Tailwind CSS utilities class, we don't use custom classes so you can do customize the
        source code to make your own themes easily.
      </p>
      <p class="my-2">
        Currently this project still on <b>early development</b>, so we will add more component and ui elements.
        Make sure to come back later to see our new collection.
      </p>
      <p class="my-8">
        Thankyou.
      </p>
    </div>
  </main>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'Home',
  components: {
    Logo
  },
  data () {
    return {
      //
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.$store.dispatch('helper/toc/open')
    this.$store.dispatch('helper/collection/setComponent', {})
  },
  methods: {
  }
}
</script>
