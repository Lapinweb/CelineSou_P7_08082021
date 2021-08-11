<template>
    <div class="row mx-0 px-0">
        <div class="col bg-white border border-secondary border-3 rounded-3">
            <!--Titre-->
            <div class="row my-2">
                <div class="col-12 col-sm-6">
                    <h1 class="text-secondary">Se connecter</h1>
                </div>
            </div>

            <!--Formulaire-->
            <form class="row mt-3">
                <!--Email-->
                <div class="col-12 col-md-6 mb-3">
                    <label for="email" class="form-label">
                        Adresse email
                        <span class="text-danger">*</span>
                    </label>

                    <input required v-model="email" type="email" name="email" id="email" class="form-control" :class="classEmail">
                    
                    <!--Message si email non valide-->
                    <div v-if="showEmailMessage === true" class="mt-1 text-end">
                        <p class="fs-6 text-danger">
                            L'email doit être valide.
                        </p>
                    </div>
                </div>

                <!--Mot de passe-->
                <div class="col-12 col-md-6">
                    <label for="password" class="form-label">
                        Mot de passe
                        <span class="text-danger">*</span>
                    </label>

                    <input required v-model="password" type="password" name="password" id="password" class="form-control mb-3" :class="classPassword">
                    
                    <!--Message si mot de passe non valide-->
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

                <!--Bouton "Envoyer"-->
                <div class="row my-3">
                    <div class="col">
                        <button type="submit" class="btn btn-info text-white" @click.prevent="signIn" :disabled="disableButton">
                            Envoyer
                        </button> 
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
        classEmail: function() {    //détermine la classe de l'input email
            if (this.email == "") {
                return {};
            }

            if(this.regexEmail.test(this.email)) {
                return {    //si le champ est valide
                    'is-valid': true
                };
            } else {
                return {    //si le champ n'est pas valide
                    'is-invalid': true
                };
            }
        },
        classPassword: function() { //détermine la classe de l'input password
        if (this.password == "") {
            return {}
        }

        if(this.regexPassword.test(this.password)) {
            return {    //si le champ est valide
                'is-valid': true
            };
        } else {
            return {    //si le champ n'est pas valide
                'is-invalid': true
            };
        }      
        },
        disableButton: function() { //désactive le bouton "Envoyer" si tous les champs ne sont pas valide
        if (!this.regexEmail.test(this.email) || !this.regexPassword.test(this.password)) {
            return true
        } else {
            return false
        }
        },
        showEmailMessage: function() {  //affiche un message si l'email n'est pas valide
        if (this.regexEmail.test(this.email) || this.email == "") {
            return false
        } else {
            return true
        }
        },
        showPasswordMessage: function() {  //affiche un message si le mot de passe n'est pas valide
        if (this.regexPassword.test(this.password) || this.password == "") {
            return false
        } else {
            return true
        }
        }  
    },
    methods: {
        //Fonction login
        signIn: function() {    //
            this.$store.dispatch('signIn', {
                email: this.email,
                password: this.password
            })
            .then(() => {   //redirige vers 'AllPosts' si l'authentification a réussie
                this.$router.push('posts');
            })
            .catch(() => {   //sinon, affiche une alerte
                alert("L'authentification a échouée!")
            })
        }
    }
}
</script>