<template>
  <div class="row mx-0 px-0">
    <div class="col bg-white border border-secondary border-3 rounded-3">
      <div class="row my-2">
        <div class="col-12">
          <h1 class="text-secondary">Créer un compte</h1>
        </div>        
      </div>

      <form class="row mt-3">
        <div class="col-12 col-md-6 mb-3">
          <label for="email" class="form-label">
            Adresse email
            <span class="text-danger">*</span>
          </label>

          <input required v-model="email" type="email" name="email" id="email" class="form-control" :class="classEmail">            
          
          <div v-if="showEmailMessage === true" class="mt-1 text-end">
            <p class="fs-6 text-danger">
              L'email doit être valide.
            </p>
          </div>       
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label for="password" class="form-label">
            Mot de passe
            <span class="text-danger">*</span>
          </label>

          <input required v-model="password" type="text" name="password" id="password" class="form-control" :class="classPassword">
        
          <div v-if="showPasswordMessage === true" class="mt-1 text-end">
            <p class="fs-6 text-danger">
              Minimum 8 lettres, avec 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.
            </p>
          </div>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label for="firstName" class="form-label">
            Prénom
            <span class="text-danger">*</span>
          </label>
          
          <input required v-model="firstName" type="text" name="firstName" id="firstName" class="form-control" :class="classFirstName">
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label for="lastName" class="form-label">
            Nom de famille
            <span class="text-danger">*</span>
          </label>
          <input required v-model="lastName" type="text" name="lastName" id="lastName" class="form-control" :class="classLastName">            
        </div>

          <div v-if="showNameMessage === true" class="row mt-1 text-end mt-0">
            <p class="fs-6 text-danger">
              Les noms et prénoms n'acceptent que les lettres.
            </p>
          </div>

        <div class="row">
          <div class="col text-end">
            <p class="col text-danger fs-6 mb-0">*Obligatoire</p> 
          </div>
        </div>

        <div class="row my-3">
          <div class="col-12">
            <button type="submit" class="btn btn-info text-white" @click.prevent="signUp" :disabled="disableButton">Envoyer</button> 
          </div>          
        </div>

      </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      regexEmail: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      regexPassword: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      regexName: /^[a-zA-ZéèêôîïÉÈÊ\s-]{2,30}$/
    }
  },
  computed: {
    classEmail: function() {
      if (this.email == "") {
        return {};
      }

      if(this.regexEmail.test(this.email)) {
        return {
          'is-valid': true
        };
      } else {
        return {
          'is-invalid': true
        };
      }
    },
    classPassword: function() {
      if (this.password == "") {
        return {}
      }

      if(this.regexPassword.test(this.password)) {
        return {
          'is-valid': true
        };
      } else {
        return {
          'is-invalid': true
        };
      }      
    },
    classFirstName: function() {
      if (this.firstName == "") {
        return {}
      }

      if(this.regexName.test(this.firstName)) {
        return {
          'is-valid': true
        };
      } else {
        return {
          'is-invalid': true
        };
      }      
    },
    classLastName: function() {
      if (this.lastName == "") {
        return {}
      }

      if(this.regexName.test(this.lastName)) {
        return {
          'is-valid': true
        };
      } else {
        return {
          'is-invalid': true
        };
      }      
    },
    disableButton: function() {
      if (!this.regexEmail.test(this.email) || !this.regexPassword.test(this.password) || !this.regexName.test(this.firstName) || !this.regexName.test(this.lastName)) {
        return true
      } else {
        return false
      }
    },
    showEmailMessage: function() {
      if (this.regexEmail.test(this.email) || this.email == "") {
        return false
      } else {
        return true
      }
    },
    showPasswordMessage: function() {
      if (this.regexPassword.test(this.password) || this.password == "") {
        return false
      } else {
        return true
      }
    },
    showNameMessage: function() {
      if ((this.regexName.test(this.firstName) && this.regexName.test(this.lastName)) || (this.firstName == "" && this.lastName == "")) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    signUp: function() {
      axios({
        url: "http://localhost:3000/api/user/signup",
        method: 'POST',
        data: {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        }
      })
      .then(() => {
        this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('posts')
        })
        .catch(error => {
          console.log(error)
          alert("Le compte a été créé mais la connexion à celle-ci a échouée!")
        })
      })
      .catch(error => {
        console.log(error);
        alert("La création d'un nouveau compte a échouée !")
      })
    }
  }
}
</script>
