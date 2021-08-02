<template>
  <div class="container">
    <div class="row">
      <div class="col bg-white border border-info border-3 rounded-3">
        <div class="row my-2">
          <div class="col-12 col-sm-6">
            <h1>Inscription</h1>
          </div>
          <div class="col-12 col-sm-6 text-end">
            <router-link to="/login" class="text-decoration-none">Connectez-vous ici</router-link>
          </div>          
        </div>
        
        <form class="row mt-3">
          <div class="col-12 col-md-6">
            <label for="email" class="form-label">Adresse email</label>
            <input type="email" name="email" id="email" class="form-control mb-3">            
          </div>

          <div class="col-12 col-md-6">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="text" name="password" id="password" class="form-control mb-3">
          </div>

          <div class="col-12 col-md-6">
            <label for="firstName" class="form-label">Prénom</label>
            <input type="text" name="firstName" id="firstName" class="form-control mb-3">
          </div>

          <div class="col-12 col-md-6">
            <label for="lastName" class="form-label">Nom de famille</label>
            <input type="text" name="lastName" id="lastName" class="form-control mb-3">            
          </div>
        </form>

        <button class="btn btn-secondary text-white my-3">Envoyer</button> 
      </div>
    </div>
  </div>
</template>              