<template>
    <div class="row mb-1">
        <div class="col-12 col-md-9">
            <div class="card shadow border border-secondary">
                <!--Titre-->
                <div class="card-header bg-secondary">
                    <h1 class="fs-3 text-white mb-1">Modifier le post</h1>
                </div>

                <!--Formulaire pour modifier le post-->
                <div class="card-body py-1">
                    <form class="row p-0">
                        <!--Contenu texte-->
                        <div class="col-12 px-0">
                            <label for="content" class="form-label fs-4 ms-2">Ecrire ici :</label>
                            <textarea v-model="content" autofocus class="form-control" name="content" id="content" rows="10"></textarea>
                        </div>

                        <!--Bouton pour enlever l'image affichée-->
                        <div v-if="originalImage || previewImage" class="col-12 mt-4 me-1 d-flex justify-content-end">
                            <button @click="deleteExistingImage" type="button" class="btn-close btn-lg" aria-label="Close"></button>
                        </div>

                        <!--Affiche l'image original si il y en a une-->
                        <div v-if="originalImage && !previewImage" class="col-12 text-center pb-3">
                            <img :src="originalImage" class="img-fluid w-100">
                        </div>

                        <!--Affiche la nouvelle image sélectionné-->
                        <div v-else-if="previewImage" class="col-12 text-center py-3">
                            <img :src="previewImage" class="img-fluid w-100">
                        </div>
                        
                        <!--Choix de l'image-->
                        <div class="col-12 mt-3">
                            <label for="image" class="form-label fs-4">Ajouter une image (format png, jpg et jpeg) :</label>
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <input @change="onFileSelected" class="form-control" type="file" ref="inputImage" accept="image/png, image/jpeg, image/jpg" id="image">
                        </div>                            


                        <!--Bouton pour envoyer le post modifié-->
                        <div class="col-12 col-md-6 text-end mb-3 pe-5">
                            <button @click.prevent="modifyPost" :disabled="disableButton" class="btn btn-info btn-lg">Publier</button>
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
    name: 'PostModify',
    data() {
        return {
            content: "",
            selectedImage: undefined,
            previewImage: undefined,
            originalImage: undefined,
            deleteImage: 0
        }
    },
    computed: {
        disableButton() {   //désactive le bouton si l'input texte est vide
            if(this.content == "") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: { 
        onFileSelected(event) {
            //récupère l'image sélectionné dans l'input file
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
            console.log("selectedImage: ", this.selectedImage);
        },
        deleteExistingImage() { //retire l'image en cliquant sur le bouton
            //si le post avait déjà une image, qu'elle est supprimée grâce à "deleteImage"
            if (this.originalImage != undefined) {
                this.deleteImage = 1;
                this.originalImage = undefined;
            }
            this.previewImage = undefined;
            this.$refs.inputImage.value = null;
        },
        //fonction modifier un post
        modifyPost() {
            const formData = new FormData();
            formData.append('content', this.content);
            formData.append('deleteImage', this.deleteImage)

            if (this.selectedImage !== undefined) {
                formData.append('image', this.selectedImage)
            }

            axios({
                url: "http://localhost:3000/api/posts/" + this.$route.params.id,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + this.$store.state.token,
                },
                data: formData
            })
            .then(() => {
                alert("Le poste a été modifié !");
                this.$router.push({name: 'SinglePost', params: this.$route.params.id});
            })
            .catch((error) => {
                console.log(error);
                alert("Une erreur est survenue !")
            })
        }
    },
    created() {
        //récupère le post à modifier
        axios({
            url: "http://localhost:3000/api/posts/" + this.$route.params.id,
            method: 'get',
            headers: {
                "Authorization": "Bearer " + this.$store.state.token
            }
        })
        .then((res) => {
            this.content = res.data.content,
            this.originalImage = res.data.imageUrl
        })
    }
}
</script>