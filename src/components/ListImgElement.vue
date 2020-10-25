<template>
  <div class="list-img-element" @click="$emit('click')">
    <div class="thumbnail" :style="{'backgroundImage': `${image}`}"> 
    </div>
    <div class="title">
        <h5><slot></slot></h5>
        <!-- <span size="s" dark transparent>{{video.author_name}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'list-img-element',
    props: {
        image: {
            type: String,
            required: false
        },       
    }
}
</script>

<style lang="scss">
.list-img-element {
    $height: 50px;
    $thumbnail-width: $height*1.33;
    box-shadow: 0px 10px 20px -20px rgba(var(--vs-dark), 1);
    background-color: rgba(var(--vs-gray-2), 1);
    border-radius: 12px;
    height: $height;
    width: 100%;
    max-width: 400px;
    margin: 20px 40px 20px 0;
    text-align: left;
    display: inline-block;

    &:hover {
        cursor: pointer; 
        h5 {
            text-decoration: underline;
        }
    }

    &:active {
        filter: brightness(80%);
    }

    div.thumbnail { 
        display: inline-flex;
        height: 40px;
        width: 40px; 
        background-size:contain;
        border-radius:10px;
        margin: 5px 10px; 
        float: left;
        justify-content: center;
        align-items: center;
    }
    div.title {
        display: inline-flex;
        position: relative;
        width: 70%;
        height: 100%; 
        margin-left: 5px;
        align-items: center;
        float: left; 
        h5 {   
            margin:0;
            max-width: 100%; 
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        } 
    }
}
</style>