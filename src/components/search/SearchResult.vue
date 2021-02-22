<template>
  <list-img-element :image="`url(${video.thumbnails[0]})`"  @click="$emit('click')"> {{video.title}} </list-img-element>
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