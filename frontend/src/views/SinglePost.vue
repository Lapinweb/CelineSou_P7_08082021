<template>
    <!--Affiche un post-->
    <div v-if="post" class="row mb-3"><!--Affiche seulment si le post a été récupéré-->
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

    <!--Formulaire pour créer un nouveau commentaire-->
    <div v-if="post" class="row mb-2">
        <form>
            <!--Champs texte du commentaire à créer-->
            <div class="col-12 col-md-9">
                <textarea v-model="content" class="form-control border border-secondary textarea-height shadow" placeholder="Ajouter un commentaire" rows="4"></textarea>
            </div>

            <!--Bouton pour envoyer le commentaire-->
            <div class="col-12 col-md-9 mt-2 mb-3 text-end">
                <button @click.prevent="sendComment" :disabled="disableCommentButton" class="btn btn-info shadow">Envoyer</button>
            </div>
        </form>
    </div>

    <!--Affiche tous les commentaires-->
    <div v-if="comments" class="row mb-1">  <!--montre seulement si les commentaires ont été récupérés-->
        <!--Message si le tableau de commentaire est vide-->
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
                @clickUpdateInput="updateCommentInput(comment.content, comment.id)"
            ></Comment>

            <!--Modal qui s'affiche pour modifier un commentaire-->
            <div class="modal fade" id="commentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!--Titre du modal-->
                        <div class="modal-header">
                            <p class="mb-0">Modifier le commentaire</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <!--Formulaire pour modifier un commentaire-->
                        <div class="modal-body">
                            <form>
                                <div class="col-12">
                                    <textarea v-model="modifiedContent" class="form-control border border-secondary textarea-height shadow" rows="4">comment.content</textarea>
                                </div>

                                <div class="col-12 mt-2 mb-3 text-end">
                                    <button @click.prevent="modifyComment(modifiedCommentId)" :disabled="disableModifyComment" class="btn btn-info shadow">Envoyer</button>
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
            content: "",    //contenu du nouveau commentaire
            modifiedContent: "", //contenu du commentaire modifié
            modifiedCommentId: null //id du commentaire modifié
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
            //désactive le bouton "Envoyer" si l'input est vide
            if (this.content === "") {
                return true;
            } else {
                return false;
            }
        },
        disableModifyComment() {
            //désactive le bouton "Envoyer" pour modifier le commentaire si l'input est vide
            if (this.modifiedContent === "") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        fullName(firstName, lastName) { //concaténe le prénon et le nom de famille
            return `${firstName} ${lastName}`
        },
        formatedDate(date) {    //renvoie la date dans un autre format
            const d = new Date(date)
            return new Intl.DateTimeFormat('fr-FR', {day:'2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(d)
        },
        showModifyButtons(componentUserId) {    //vérifie si l'utilisateur est le créateur du post ou commentaire ou un administrateur
            if (componentUserId == this.currentUserId || this.isUserAdmin === true) {
                return true;
            } else {
                return false;
            }
        },
        //fonction supprimer un post
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
                this.$router.push({name: 'AllPosts'});
            })
            .catch(() => {
                alert("Une erreur est survenue !");
            })
        },
        //fonction envoyer un commentaire
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
            .catch(() => {
                alert("Une erreur est survenue ! Veuillez réessayer !");
            })
        },
        //fonction supprimer un commentaire
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
        //fonction modifier un commentaire
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
            .catch(() => {
                alert("Une erreur est survenue !");
            })
        },
        //en appuyant sur le bouton pour modifier un commentaire, modifie la valeur dans l'input et l'id du commentaire modifié
        updateCommentInput(commentContent, commentId) {
            this.modifiedContent = commentContent;
            this.modifiedCommentId = commentId;
        }
    },
    created() {
        //récupère le post grâce à l'id du post en paramètre d'URL
        const getPost = axios({
            url: "http://localhost:3000/api/posts/" + this.$route.params.id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        });

        //récupère tous les commentaires correspondant à l'id du post
        const getComments = axios({
            url: "http://localhost:3000/api/posts/" + this.$route.params.id + "/comments",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        });

        axios.all([getPost, getComments])
            .then(axios.spread((post, comments) => {
                this.post = post.data;
                this.comments = comments.data;
            }))
            .catch(() => alert("Le post n'a pas pu être chargé !"));

    }
}
</script>

<style lang="scss">
</style>