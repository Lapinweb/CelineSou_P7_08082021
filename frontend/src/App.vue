<template>
    <!--Le header en position sticky-->
    <header class="container-fluid sticky-top bg-primary">
        <div class="row">
            <nav class="navbar navbar-expand-sm navbar-dark display-flex py-0">
                <router-link to="/" class="navbar-brand col-6 col-sm-4 col-md-3 col-lg-2">
                    <img src="./assets/images/icon-left-font-monochrome-white-cropped.png" alt="icone groupomania" class="img-fluid">
                </router-link>

                <!--Boutons de barre de navigation-->
                <button v-if="isLoggedIn === true" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-label="Toggle navigation">>
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!--Les boutons Profile et Déconnexion n'apparaissent que si l'utilisateur est connecté-->
                <div v-if="isLoggedIn == true" id="navbarContent" class="collapse navbar-collapse justify-content-end">
                    <ul class="navbar-nav d-flex align-items-center">
                        <li class="nav-item fs-5">
                            <router-link :to="{name: 'Profile', params: {id: currentUserId}}" class="nav-link text-white">Profile</router-link>
                        </li>
                        <li class="nav-item">
                            <button @click="logOut" class="nav-link btn text-white fs-5">Déconnexion</button>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    </header>

    <!--Le contenu principal-->
    <main class="container mt-4 mb-5 pb-5">
        <router-view></router-view>
    </main>

    <!--Le footer reste toujours en bas de la page, attention à laisser de la marge-->
    <footer class="container-fluid fixed-bottom bg-primary py-4">
    </footer>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: "App",
    data() {
        return {
        }
    },
    computed: {
        //isLoggedIn vérifie que l'utilisateur est connecté
        //currentUserId renvoie le userId
        ...mapGetters(['isLoggedIn', 'currentUserId'])
    },
    methods: {
        //fonction logout
        logOut: function() {
            this.$store.dispatch('logOut');
            this.$router.push('/login');  //renvoie à la page 'login'
        }
    },
    created() {
        //intercepte les erreurs 401 dues aux tokens expirés
        const vm = this;
        axios.interceptors.response.use(undefined, function(error) {
            if (error.response.status === 401) {
                vm.$store.dispatch('logOut');
                vm.$router.push('/login');
            } else {
                return Promise.reject(error);
            }
        })
    }
}
</script>


<style lang="scss">
    #app {
    min-height: 100vh;
    background: url('./assets/images/icon.png') center fixed no-repeat;
    background-size: cover;
    }
</style>
