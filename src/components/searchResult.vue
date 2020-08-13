<template>
  <div class="search-result">
    <div class="thumbnail">
        <img :src="video.thumbnail_url" />
    </div>
    <div class="title">
        <h5>{{video.title}}</h5>
        <span size="s" dark transparent>{{video.author_name}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'search-result',
    props: {
        video: {
            type: Object,
            required: true
        }       
    }
}
</script>

<style lang="scss">
.search-result {
    $height: 85px;
    $thumbnail-width: $height*1.33;
    box-shadow: 0px 10px 20px -20px rgba(var(--vs-dark), 1);
    background-color: rgba(var(--vs-gray-2), 1);
    border-radius: 12px;
    height: $height;
    width: 100%;
    max-width: 400px;
    margin: 20px 40px 20px 0;

    display: inline-grid;
    grid-template-areas: "img title"
                         "img btn";
    grid-template-rows: 2fr 1fr;
    grid-template-columns: $thumbnail-width 1fr;

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
        grid-area: "img";
        position: relative;
        img {
            height: $height;
            width: auto;
            border-radius: 12px 0 0 12px;
        }
    }
    div.title {
        position: relative;
        h5 { 
            position:absolute;
            padding: 10px;    
            margin:0;
            width: 80%; 
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            position: absolute;
            bottom: 15px;
            left: 12px;
            font-size: 13px;
        }
    }
}
</style>