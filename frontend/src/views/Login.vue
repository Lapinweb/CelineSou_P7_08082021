<template>
  <div class="container">
    <div class="row">
      <div class="col bg-white border border-info border-3 rounded-3">
        
        <div class="row my-2">
          <div class="col-12 col-sm-6">
            <h1>Connexion</h1>
          </div>

          <div class="col-12 col-sm-6 text-end">
            <router-link to="/signup" class="text-decoration-none">Inscrivez-vous ici</router-link>
          </div>          
        </div>

        <form class="row mt-3">
          <div class="col-12 col-md-6">
            <label for="email" class="form-label">Adresse email</label>
            <input v-model="email" type="email" name="email" id="email" class="form-control mb-3">            
          </div>

          <div class="col-12 col-md-6">
            <label for="password" class="form-label">Mot de passe</label>
            <input v-model="password" type="text" name="password" id="password" class="form-control mb-3">
          </div>
        </form>

        <div class="row align-items-center justify-content-center">
          <div class="col">
            <button class="btn btn-secondary text-white my-3">Envoyer</button> 
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>