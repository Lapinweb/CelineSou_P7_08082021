<template>
    <div class="row py-3 mb-5 d-flex justify-content-between align-items-center">
        <div class="col-12 col-sm-6">
            <button class="btn btn-secondary" @click="reverseOrder()">
                Trier par :
                <span v-if="chronologicalOrder == false">les plus récents</span>
                <span v-else>les plus anciens</span>
            </button>                  
        </div>

        <div class="col-12 col-sm-6 text-end mt-2 mt-sm-0">
            <router-link to="/newpost" class="btn btn-secondary">
                Créer un nouveau post
                <i class="fas fa-pen"></i>
            </router-link>
        </div>
    </div>

    <div v-for="post in posts" :key="post.id" class="row mb-5">
        <Post
            :fullName="fullName(post.user.firstName, post.user.lastName)"
            :content="post.content"
            :date="formatedDate(post.createdAt)"
            :imageUrl="post.imageUrl"
            :postId="post.id"
            :postUserId="post.userId"
            :userId="currentUserId"
        ></Post>
    </div>

</template>

<script>
import Post from '../components/Post.vue'

export default {
    name: 'Posts',
    components: {
        Post
    },
    data() {
        return {
            posts: [],
            chronologicalOrder: false,
        }
    },
    computed: {
        currentUserId: function() {
            const id = sessionStorage.getItem("userId");
            return parseInt(id);
        }
    },
    methods: {
        fullName(firstName, lastName) {
            return `${firstName} ${lastName}`
        },
        formatedDate(date) {
            const d = new Date(date)
            return new Intl.DateTimeFormat('fr-FR', {day:'2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(d)
        },
        reverseOrder() {
            this.posts.reverse();
            this.chronologicalOrder = !this.chronologicalOrder;
        }
    },
    created() {
        fetch("http://localhost:3000/api/posts", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json()
            }
        })
        .then((posts) => {
            console.log("posts: ", posts)
            this.posts = posts
        })
        .catch(error => console.log(error));
    }
}
</script>