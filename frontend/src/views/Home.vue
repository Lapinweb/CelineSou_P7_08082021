<template>
  <h1 class="mb-5">Bienvenue sur le réseau de Groupomania!</h1>

  <div class="container">

    <div class="row mb-1">
      <div class="col-12 px-0">
        <div class="btn-group px-0 w-100">
          <router-link to="/login" class="btn btn-secondary">Connexion</router-link>
          <router-link to="/signup" class="btn btn-secondary">Inscription</router-link>
        </div>        
      </div>
    </div>

    <div class="row">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
