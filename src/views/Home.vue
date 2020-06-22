<template>
  <main class="overflow-auto flex flex-1" />
</template>

<script>
export default {
  name: 'Home',
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
