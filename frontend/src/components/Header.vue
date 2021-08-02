<template>
  <header class="container-fluid sticky-top bg-primary">
    <div class="row">
      <nav class="navbar navbar-expand-sm navbar-dark display-flex py-0">
        <router-link to="/" class="navbar-brand col-6 col-sm-4 col-md-3 col-lg-2">
          <img src="../assets/images/icon-left-font-monochrome-white-cropped.png" alt="icone groupomania" class="img-fluid">
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white">Se connecter</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link text-white">S'inscrire</router-link>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  </header>  
</template>

<script>
export default {
  name: "Header"
}
</script>