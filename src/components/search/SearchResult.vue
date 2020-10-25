<template>
  <list-img-element :image="`url(${video.thumbnail_url})`"  @click="$emit('click')"> {{video.title}} </list-img-element>
</template>

<script>
import ListImgElement from '../ListImgElement';

export default {
    name: 'search-result',
    components: {ListImgElement},
    props: {
        video: {
            type: Object,
            required: true
        }       
    }, 
}
</script>

<style lang="scss">
.search-result {
     
}
</style>