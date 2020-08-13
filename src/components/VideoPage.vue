<template>
  <div class="video-page">
    <vs-button @click="$emit('toggle')">Toggle</vs-button>
  </div>
</template>

<script>
export default {
  name: 'video-page',
}
</script>

<style lang="scss">
.video-page {
  height: 100vh;
  width: 100%;
  background-color: red;
}
</style>