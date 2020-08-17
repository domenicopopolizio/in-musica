<template>
  <div id="app"> 
    <router-view/>
  </div>
</template> 
<script>
export default {
  beforeMount() {
    this.$store.dispatch('initFirebase');
  }
}
</script>

<style lang="scss">
@import "scss/dialog.scss";

html, body {
    border: 0;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}
</style>
