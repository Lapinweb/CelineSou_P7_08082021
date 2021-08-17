<template>
    <h1>Profile</h1>

    <div v-if="user" class="container bg-white border border-secondary border-4 p-0 shadow">
        <div class="row justify-content-between">
            <!--Image de profile-->
            <div class="col-12 col-md-4 mb-3 mb-sm-0 text-center">
                <img src="../assets/images/default_profile.png" alt="" class="img-fluid img-cover w-100 rounded-circle p-2">
            </div>

            <div class="col-12 col-sm-7 mt-2 ms-3 ms-md-0 mb-4 d-flex flex-column justify-content-around">
                <!--Nom complet-->
                <div class="col-12">
                    <h2>{{user.firstName}} {{user.lastName}}</h2>
                    <p>{{user.email}}</p>                    
                </div>

                <!--Bouton pour supprimer le compte-->
                <div v-if="currentUserId == profileUserId" class="col-12">
                    <button @click="deleteAccount" class="btn btn-danger">Supprimer le compte</button>
                </div>
            </div>          
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    data() {
        return {
            user: null
        }
    },
    computed: {
        currentUserId: function() {
            return this.$store.getters.currentUserId
        },
        profileUserId: function() {
            return this.$route.params.id;
        }
    },
    methods: {
        //fonction supprimer le compte
        deleteAccount: function() {
            axios({
                url: "http://localhost:3000/api/user/" + this.profileUserId,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.token
                }
            })
            .then(() => {
                localStorage.clear();
                this.$store.dispatch('logOut');
                alert("Le compte a été supprimé.")
                this.$router.push({path: "/login"});    //renvoie à la page 'login'
            })
            .catch(() => {
                alert("La suppression du compte a échouée.")
            })
        }
    },
    created() {
        //récupère les données du profil de l'utilisateur
        axios({
            url: "http://localhost:3000/api/user/" + this.$route.params.id,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.token
            }
        })
        .then((res) => {
            this.user = res.data;
        })
    }
}
</script>