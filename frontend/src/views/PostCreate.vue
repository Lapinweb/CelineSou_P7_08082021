<template>
    <div class="row mb-1">
        <div class="col-12 col-md-9">
            <div class="card shadow border border-secondary">
                <!--Titre-->
                <div class="card-header bg-secondary">
                    <h1 class="fs-3 text-white mb-1">Nouveau post</h1>
                </div>

                <!--Formulaire pour créer un nouveau post-->
                <div class="card-body py-1">
                    <form class="row p-0">
                        <!--Contenu texte-->
                        <div class="col-12 px-0">
                            <label for="content" class="form-label fs-4 ms-2">Ecrire ici :</label>
                            <textarea v-model="content" autofocus class="form-control" name="content" id="content" rows="10"></textarea>
                        </div>

                        <!--Si une image est sélectionné, elle est visualisé-->
                        <template v-if="previewImage">
                            <div class="col-12 mt-4 me-1 d-flex justify-content-end">
                                <button @click="deleteImage" type="button" class="btn-close btn-lg" aria-label="Close"></button>
                            </div>
                            
                            <div class="col-12 text-center py-3">
                                <img :src="previewImage" class="img-fluid w-100">
                            </div>                            
                        </template>

                        <!--Choix de l'image-->
                        <div class="col-12 mt-3">
                            <label for="image" class="form-label fs-4">Ajouter une image (format png, jpg et jpeg) :</label>
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <input @change="onFileSelected" ref="inputImage" class="form-control" type="file" accept="image/png, image/jpeg, image/jpg" id="image">
                        </div>
                        
                        <!--Bouton pour envoyer le post-->
                        <div class="col-12 col-md-6 text-end my-3 pe-5">
                            <button @click.prevent="sendPost" :disabled="disableButton" class="btn btn-info btn-lg">Publier</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer bg-secondary py-3"></div>
            </div>        
        </div>        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PostForm',
    data() {
        return {
            content: "",
            selectedImage: undefined,
            previewImage: undefined
        }
    },
    computed: {
        disableButton() {   //désactive le bouton si le contenu l'input texte est vide
            if(this.content == "") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        //récupère l'image sélectionné dans l'input file
        onFileSelected: function(event) {
            const file = event.target.files
            const reader = new FileReader();
            if (file && file[0]) {  //affiche l'image sélectionnée
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(file[0]);
            } else {    //ou l'enlève
                this.previewImage = undefined;
            }
            this.selectedImage = file[0];

        },
        deleteImage() { //retire l'image en cliquant sur le bouton
            this.previewImage = undefined;
            this.selectedImage = undefined;
            this.$refs.inputImage.value = null;
        },
        //fonction publier un post
        sendPost: function() {
            const formData = new FormData();
            formData.append('content', this.content);

            if (this.selectedImage !== undefined) {
                formData.append('image', this.selectedImage)
            }

            axios({
                url: "http://localhost:3000/api/posts",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + this.$store.state.token
                },
                data: formData
            })
            .then(() => {
                alert("Le contenu a été posté !");
                this.$router.push('/posts');    //redirige vers 'posts'
            })
            .catch(() => {
                alert("Une erreur est survenue !");
            })            
        }
    }
}
</script>

