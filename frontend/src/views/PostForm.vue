<template>
    <div class="card shadow border border-secondary border-3">
        <div class="card-body py-1">
            <form class="row p-0">
                <div class="col-12 px-0">
                    <label for="content" class="form-label fs-3 ms-2">Ecrivez ici :</label>
                    <textarea v-model="content" class="form-control" name="content" id="content" rows="10"></textarea>
                </div>
                
                <div class="col-12 mt-3">
                    <label for="image" class="form-label fs-4">Ajouter une image (format png, jpg et jpeg) :</label>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <input @change="onFileSelected" class="form-control" type="file" accept="image/png, image/jpeg, image/jpg" id="image">
                </div>
                
                <div class="col-12 col-md-6 text-end mb-3 pe-5">
                    <button @click.prevent="sendPost" :disabled="disableButton" class="btn btn-secondary btn-lg">Poster</button>
                </div>
                
            </form>
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
            selectedFile: undefined
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
        onFileSelected: function(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        sendPost: function() {
            if (this.selectedFile !== undefined) {
                console.log("content type: ", typeof this.content)
                console.log('content: ', this.content, 'file: ', this.selectedFile)

                const formData = new FormData();
                formData.append('content', this.content)
                formData.append('image', this.selectedFile)
                console.log("formData: ", formData);
                console.log("formData: ", formData.content);

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
                    this.$router.push('/posts');
                })
                .catch((error) => {
                    alert("Une erreur est survenue !")
                    console.log(error)
                })
            } else {
                axios({
                    url: "http://localhost:3000/api/posts",
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + this.$store.state.token
                    },
                    data: {content: this.content}
                })
                .then(() => {
                    alert("Le contenu a été posté !");
                    this.$router.push('/posts');
                })
                .catch(error => {
                    alert("Une erreur est survenue !")
                    console.log(error)
                })
            }

        }
    }
}
</script>

