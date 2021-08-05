<template>
    <div class="container">
        <div class="row bg-secondary mb-4 rounded-3">
            <div class="col-12">
                <p>Trier</p>
            </div>
        </div>
    </div>


    <div class="container">

        <Post/>
        
    </div>
</template>

<script>
import Post from '../components/Post.vue'

export default {
    name: 'Posts',
    components: {
        Post
    }
}
</script>