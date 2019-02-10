<template lang="pug">
  .tile.box
    p(@click="log") 369369
</template>

<script>
export default {
  asyncData ({ router, store }) {

  },
  methods: {
    log () {
      this.$toast.open('Something happened');
    }
  }
}
</script>

<style scoped>
p {
  color: red;
}
</style>
