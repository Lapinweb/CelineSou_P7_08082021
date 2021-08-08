<template>
    <div v-if="post" class="row mb-3">
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

    <div class="row">
        <form>
            <div class="col-12 col-md-9">
                <textarea class="form-control border border-secondary textarea-height" placeholder="Ajouter un commentaire"></textarea>
            </div>
            <div class="col-12 col-md-9 mt-2 mb-3 text-end">
                <button class="btn btn-secondary text-white">Envoyer</button>
            </div>

        </form>
    </div>

    <div v-if="comments" class="row">
        <Comment
            v-for="(comment, index) in comments" :key="index"
            :fullName="fullName(comment.user.firstName, comment.user.lastName)"
            :comment="comment.content"
            :date="formatedDate(comment.createdAt)"
        ></Comment>
    </div>

    <div v-else class="row">
        <div class="col-12 col-md-9 text-center">
            <p class="mt-3 mb-0 fs-4">Aucun commentaire</p>
        </div>
    </div>

</template>

<script>
import Post from '../components/Post.vue'
import Comment from '../components/Comment.vue'

export default {
    name: 'SinglePost',
    components: {
        Post,
        Comment
    },
    data() {
        return {
            post: null,
            comments: null
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
    created() {
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
            if (onePost.comments.length != 0) {
                this.comments = onePost.comments;
            }
            console.log("this.onePost: ", this.post);
        })
        .catch(error => console.log(error));
    }
}
</script>

<style lang="scss">
    .textarea-height {
        height: 100px;
    }
</style>