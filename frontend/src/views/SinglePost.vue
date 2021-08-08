<template>
    <div class="row">
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
    name: 'SinglePost',
    components: {
        Post
    },
    data() {
        return {
            post: {}
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
        disableButton(postUserId) {
            if (this.currentUserId == postUserId) {
                return false;
            } else {
                return true;
            }
        },
    },
    beforeCreate() {
        fetch("http://localhost:3000/api/posts/" + this.$route.params.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
        })
        .then((onePost) => {
            console.log("post: ", onePost);
            this.post = onePost;
            console.log("this.onePost: ", this.post);
        })
        .catch(error => console.log(error));
    }
}
</script>