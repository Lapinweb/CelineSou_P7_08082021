<template>
    <div v-if="post" class="row mb-3">
        <Post
            :fullName="fullName(post.user.firstName, post.user.lastName)"
            :content="post.content"
            :date="formatedDate(post.createdAt)"
            :imageUrl="post.imageUrl"
            :postId="post.id"
            :showModifyButtons="showModifyButtons(post.userId)"
            @clickDeletePost="deletePost(post.id)"
        ></Post>
    </div>

    <div class="row mb-2">
        <form>
            <div class="col-12 col-md-9">
                <textarea v-model="content" class="form-control border border-secondary textarea-height shadow" placeholder="Ajouter un commentaire" rows="4"></textarea>
            </div>
            <div class="col-12 col-md-9 mt-2 mb-3 text-end">
                <button @click.prevent="sendComment" :disabled="disableCommentButton" class="btn btn-info text-white shadow">Envoyer</button>
            </div>

        </form>
    </div>

    <div v-if="comments" class="row mb-1">
        <div v-if="ifNoComment" class="col-12 col-md-9 text-center">
            <p class="mt-3 mb-0 fs-4">Aucun commentaire</p>
        </div>

        <div v-for="(comment, index) in comments" :key="index">
            <Comment
                :fullName="fullName(comment.user.firstName, comment.user.lastName)"
                :comment="comment.content"
                :date="formatedDate(comment.createdAt)"
                :showButtons="showModifyButtons(comment.userId)"
                :linkToPost="false"
                :showCommentButton="false"
                @clickDeleteComment="deleteComment(comment.id)"
                @clickUpdateInput="updateCommentInput(comment.content)"
            ></Comment>

            <div class="modal fade" id="commentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="mb-0">Modifier le commentaire</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="col-12">
                                    <textarea v-model="modifiedContent" class="form-control border border-secondary textarea-height shadow" rows="4">comment.content</textarea>
                                </div>
                                <div class="col-12 mt-2 mb-3 text-end">
                                    <button @click.prevent="modifyComment(comment.id)" :disabled="disableModifyComment" class="btn btn-info text-white shadow">Envoyer</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>




</template>

<script>
import axios from 'axios';
import Post from '../components/Post.vue';
import Comment from '../components/Comment.vue';

export default {
    name: 'SinglePost',
    components: {
        Post,
        Comment
    },
    data() {
        return {
            post: null,
            comments: null,
            content: "",
            modifiedContent: ""
        }
    },
    computed: {
        currentUserId: function() {
            return this.$store.getters.currentUserId
        },
        isUserAdmin: function() {
            return this.$store.getters.isUserAdmin
        },
        ifNoComment: function() {
            if (this.comments.length === 0) {
                return true;
            } else {
                return false;
            }
        },
        disableCommentButton: function() {
            if (this.content === "") {
                return true;
            } else {
                return false;
            }
        },
        disableModifyComment() {
            if (this.modifiedContent === "") {
                return true;
            } else {
                return false;
            }
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
        showModifyButtons(componentUserId) {
            if (componentUserId == this.currentUserId || this.isUserAdmin == true) {
                return true;
            } else {
                return false;
            }
        },
        sendComment() {
            axios({
                url: "http://localhost:3000/api/posts/" + this.$route.params.id + "/comments",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.$store.state.token
                },
                data: {content: this.content}
            })
            .then(() => {
                alert("Le commentaire a été posté !");
                this.$router.go();
            })
            .catch(error => {
                alert("Une erreur est survenue ! Veuillez réessayer !")
                console.log(error)
            })
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
                this.$router.push('/posts');
            })
            .catch((error) => {
                alert("Une erreur est survenue !");
                console.log(error);
            })
        },
        deleteComment(commentId) {
            axios({
                url: "http://localhost:3000/api/comments/" + commentId,
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + this.$store.state.token
                }
            })
            .then(() => {
                alert("Le commentaire a été supprimé !");
                this.$router.go();
            })
            .catch(() => {
                alert("Une erreur est survenue !")
            })
        },
        modifyComment(commentId) {
            axios({
                url: "http://localhost:3000/api/comments/" + commentId,
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.$store.state.token
                },
                data: {content: this.modifiedContent}
            })
            .then(() => {
                alert("Le commentaire a été modifié !");
                this.$router.go();
            })
            .catch((error) => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
        },
        updateCommentInput(commentContent) {
            this.modifiedContent = commentContent;
        }
    },
    created() {
        const getPosts = axios({
            url: "http://localhost:3000/api/posts/" + this.$route.params.id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        });

        const getComments = axios({
            url: "http://localhost:3000/api/posts/" + this.$route.params.id + "/comments",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        });

        axios.all([getPosts, getComments])
            .then(axios.spread((post, comments) => {
                this.post = post.data;
                this.comments = comments.data;
                console.log(this.post);
                console.log(this.comments);
            }))
            .catch(error => console.log(error));

    }
}
</script>

<style lang="scss">
</style>