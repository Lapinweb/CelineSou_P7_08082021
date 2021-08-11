<template>
    <div class="row py-3 mb-5 d-flex justify-content-between align-items-center">
        <div class="col-12 col-sm-6">               
        </div>

        <!--Bouton pour créer un nouveau post-->
        <div class="col-12 col-sm-6 text-end mt-2 mt-sm-0">
            <router-link to="/newpost" class="btn btn-info text-white fs-5">
                Nouveau post
                <i class="fas fa-pen"></i>
            </router-link>
        </div>
    </div>

    <!--Affichage de tous les posts-->
    <template v-if="posts"> <!--montre seulement si les posts ont été récupérés-->
        <div v-for="(post, index) in posts" :key="index" class="row mb-5"><!--boucle du tableau posts-->
            <Post
                :fullName="fullName(post.user.firstName, post.user.lastName)"
                :content="post.content"
                :date="formattedDate(post.createdAt)"
                :imageUrl="post.imageUrl"
                :postId="post.id"
                :showModifyButtons="showModifyButtons(post.userId)"
                :showCommentButton="true"
                :linkToPost="true"
                @clickDeletePost="deletePost(post.id)"
            ></Post>
        </div>        
    </template>


</template>

<script>
import axios from 'axios';
import Post from '../components/Post.vue';
import { mapGetters } from 'vuex';

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
        ...mapGetters(['currentUserId']),
        isUserAdmin() {
            return this.$store.state.isAdmin;
        }
    },
    methods: {
        fullName(firstName, lastName) { //concaténe le prénon et le nom de famille
            return `${firstName} ${lastName}`
        },
        formattedDate(date) { //renvoie la date dans un autre format
            const d = new Date(date)
            return new Intl.DateTimeFormat('fr-FR', {day:'2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(d)
        },
        showModifyButtons(postUserId) { //vérifie si l'utilisateur est le créateur du post ou un administrateur
            if (postUserId == this.currentUserId || this.isUserAdmin) {
                return true;
            } else {
                return false;
            }
        },
        //fonction pour supprimer un post
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
                this.$router.go(); //actualise la page
            })
            .catch(() => {
                alert("Une erreur est survenue !");
            })
        }
    },
    created() {
        //récupère tous les posts dans un tableau
        axios({
            url: "http://localhost:3000/api/posts",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((posts) => {
            this.posts = posts.data
        })
        .catch(() => alert("Les posts n'ont pas pu être chargés !"));
    }
}
</script>