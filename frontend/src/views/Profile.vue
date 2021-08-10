<template>
    <h1>Profile</h1>

    <div v-if="user" class="container bg-white border border-secondary border-4 p-0 shadow">
        <div class="row justify-content-between">
            <div class="col-12 col-md-4 mb-3 mb-sm-0 text-center">
                <img src="../assets/images/default_profile.png" alt="" class="img-fluid img-cover w-100 rounded-circle p-2">
            </div>

            <div class="col-12 col-sm-7 mt-2 ms-3 ms-md-0 mb-4 d-flex flex-column justify-content-around">
                <div class="col-12">
                    <h2>{{user.firstName}} {{user.lastName}}</h2>
                    <p>{{user.email}}</p>                    
                </div>

                <div v-if="currentUserId == profileUserId" class="col-12">
                    <button @click="deleteAccount" class="btn btn-danger">Supprimer le compte</button>
                </div>
            </div>          
        </div>

        <div class="row">

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
        deleteAccount: function() {
            axios({
                url: "http://localhost:3000/api/user/" + this.$route.params.id,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.token
                }
            })
            .then(() => {
                localStorage.clear();
                alert("Le compte a été supprimé.")
                this.$router.push({path: "/login"});
            })
            .catch((res) => {
                console.log(res);
                alert("La suppression du compte a échouée.")
            })
        }
    },
    created() {
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