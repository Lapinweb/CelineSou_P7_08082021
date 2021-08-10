<template>
    <div class="row py-3 mb-5 d-flex justify-content-between align-items-center">
        <div class="col-12 col-sm-6">               
        </div>

        <div class="col-12 col-sm-6 text-end mt-2 mt-sm-0">
            <router-link to="/newpost" class="btn btn-info text-white fs-5">
                Nouveau post
                <i class="fas fa-pen"></i>
            </router-link>
        </div>
    </div>

    <div v-if="posts">
        <div v-for="(post, index) in posts" :key="index" class="row mb-5">
            <Post
                :fullName="fullName(post.user.firstName, post.user.lastName)"
                :content="post.content"
                :date="formatedDate(post.createdAt)"
                :imageUrl="post.imageUrl"
                :postId="post.id"
                :showModifyButtons="showModifyButtons(post.userId)"
                :showCommentButton="true"
                :linkToPost="true"
                @clickDeletePost="deletePost(post.id)"
            ></Post>
        </div>        
    </div>


</template>

<script>
import axios from 'axios';
import Post from '../components/Post.vue';

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
            return this.$store.getters.currentUserId
        },
        isUserAdmin: function() {
            return this.$store.getters.isUserAdmin
        },
    },
    methods: {
        fullName(firstName, lastName) {
            return `${firstName} ${lastName}`
        },
        formatedDate(date) {
            const d = new Date(date)
            return new Intl.DateTimeFormat('fr-FR', {day:'2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(d)
        },
        showModifyButtons(postUserId) {
            if (postUserId == this.currentUserId || this.isUserAdmin == true) {
                return true;
            } else {
                return false;
            }
        },
        deletePost(postId) {
            axios({
                url: "http://localhost:3000/api/posts/" + postId,
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token
                }
            })
            .then(() => {
                alert("Le post a été supprimé !");
                this.$router.go();
            })
            .catch((error) => {
                alert("Une erreur est survenue !");
                console.log(error);
            })
        }
    },
    created() {
        axios({
            url: "http://localhost:3000/api/posts",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((posts) => {
            console.log("posts: ", posts)
            this.posts = posts.data
        })
        .catch(error => console.log(error));
    }
}
</script>