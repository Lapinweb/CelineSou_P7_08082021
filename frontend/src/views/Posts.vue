<template>
    <div class="container">
        <div class="row bg-secondary mb-4 rounded-3">
            <div class="col-12 text-white">
                <p class="my-2 fs-5">Trier par</p>
            </div>
        </div>
    </div>

    <div class="container">

        <Post
            v-for="post in posts"
            :key="post"
            :fullName="fullName(post.user.firstName, post.user.lastName)"
            :content="post.content"
            :date="formatedDate(post.createdAt)"
            :imageUrl="post.imageUrl"
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
            content: "Ceci n'est pas un post !",
            imageUrl: "",
            createdAt: "2021-01-05 18:53:52",
            firstName: "Céline",
            lastName: "Sou",
            posts: []
        }
    },
    computed: {
        getToken() {
            return this.$store.state.token
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
    },
    beforeCreate() {
        console.log(this.$store.state.token)
        fetch("http://localhost:3000/api/posts", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((res) => {
            console.log(res)
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