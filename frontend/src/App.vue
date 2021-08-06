<template>
  <header class="container-fluid sticky-top bg-primary">
    <div class="row">
      <nav class="navbar navbar-expand-sm navbar-dark display-flex py-0">
        <router-link to="/" class="navbar-brand col-6 col-sm-4 col-md-3 col-lg-2">
          <img src="./assets/images/icon-left-font-monochrome-white-cropped.png" alt="icone groupomania" class="img-fluid">
        </router-link>

        <button v-if="isLoggedIn === true" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div v-if="isLoggedIn == true" id="navbarContent" class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link text-white">Profile</router-link>
            </li>
            <li class="nav-item">
              <a @click="logOut" href="#" class="nav-link text-white">Déconnexion</a>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  </header>

  <main class="container mt-4 mb-5 pb-5">
    <div class="row">
      <div class="col-12">
        <router-view></router-view>
      </div>
    </div>
  </main>

  <footer class="container-fluid fixed-bottom bg-primary py-4">
  </footer>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logOut: function() {
      sessionStorage.clear;
      this.$store.commit('logout');
      this.$router.push('/login');
    }
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
