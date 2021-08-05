<template>
  <div class="row mx-0 px-0">
    <div class="col bg-white border border-secondary border-3 rounded-3">
      
      <div class="row my-2">
        <div class="col-12 col-sm-6">
          <h1 class="text-secondary">Se connecter</h1>
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

        <div class="col-12 col-md-6">
          <label for="password" class="form-label">
            Mot de passe
            <span class="text-danger">*</span>
          </label>

          <input required v-model="password" type="text" name="password" id="password" class="form-control mb-3" :class="classPassword">
        
          <div v-if="showPasswordMessage === true" class="mt-1 text-end">
            <p class="fs-6 text-danger">
              Minimum 8 lettres, avec 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <p class="col text-danger fs-6 mb-0">*Obligatoire</p> 
          </div>
        </div>

        <div class="row my-3">
          <div class="col">
            <button type="submit" class="btn btn-secondary text-white" @click.prevent="signIn" :disabled="disableButton">Envoyer</button> 
          </div>  
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      regexEmail: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      regexPassword: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
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
    disableButton: function() {
      if (!this.regexEmail.test(this.email) || !this.regexPassword.test(this.password)) {
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
    }  
  },
  methods: {
    submitLogin: function() {

      fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: this.email, password: this.password})
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(res => {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("userId", res.userId);
        sessionStorage.setItem("isAdmin", res.isAdmin);
      })
      .then(() => {
        const token = sessionStorage.getItem("token")
        console.log(token)
        this.$router.push('/posts')
      })
      .catch(error => {
        console.log(error)
      })
    },
    signIn: function() {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('posts');
      })
      .catch(error => {
        console.log(error)
        alert("L'authentification a échouée!")
      })
    }
  }
}
</script>