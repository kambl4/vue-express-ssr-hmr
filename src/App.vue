<template lang="pug">
#app
  p
    router-link(to="/") Go To Home
    router-link(to="/about") Go To About
  router-view
</template>

<script>
  export default {
  };
</script>