<template>
    <div class="row mb-1">
        <div class="col-12 col-md-9">
            <div class="card shadow border border-secondary">
                <div class="card-header bg-secondary">
                    <h1 class="fs-3 text-white mb-1">Modifier le post</h1>
                </div>
                <div class="card-body py-1">
                    <form class="row p-0">
                        <div class="col-12 px-0">
                            <label for="content" class="form-label fs-4 ms-2">Ecrire ici :</label>
                            <textarea v-model="content" autofocus class="form-control" name="content" id="content" rows="10"></textarea>
                        </div>

                        <div v-if="originalImage && !previewImage" class="col-12 text-center py-3">
                            <img :src="originalImage" class="img-fluid w-100">
                        </div>

                        <div v-else-if="previewImage" class="col-12 text-center py-3">
                            <img :src="previewImage" class="img-fluid w-100">
                        </div>
                        

                        <div class="col-12 mt-3">
                            <label for="image" class="form-label fs-4">Ajouter une image (format png, jpg et jpeg) :</label>
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <input @change="onFileSelected" class="form-control" type="file" accept="image/png, image/jpeg, image/jpg" id="image">
                        </div>                            


                        
                        <div class="col-12 col-md-6 text-end mb-3 pe-5">
                            <button @click.prevent="modifyPost" :disabled="disableButton" class="btn btn-info btn-lg text-white">Poster</button>
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
            originalImage: undefined
        }
    },
    computed: {
        disableButton() {
            if(this.content == "") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        onFileSelected(event) {
            const file = event.target.files
            const reader = new FileReader();
            if (file && file[0]) {
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(file[0]);
            } else {
                this.previewImage = undefined;
            }
            this.selectedImage = file[0];
            console.log("selectedImage: ", this.selectedImage);
        },
        modifyPost() {
            const formData = new FormData();
            formData.append('content', this.content);

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
                this.$router.push({name: 'AllPosts'});
            })
            .catch((error) => {
                console.log(error);
                alert("Une erreur est survenue !")
            })
        }
    },
    created() {
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