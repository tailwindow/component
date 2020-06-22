<template>
  <main class="flex flex-col flex-1 text-center">
    <div class="text-6xl mt-24">
      404
    </div>
    <p>
      Page not found
    </p>
  </main>
</template>

<script>
export default {
  name: 'E404',
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
  },
  methods: {
  }
}
</script>
