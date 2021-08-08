<template>
    <div class="card shadow border border-secondary">
        <div class="card-body py-1">
            <form class="row p-0">
                <div class="col-12 px-0">
                    <label for="content" class="form-label fs-3 ms-2">Ecrivez ici :</label>
                    <textarea v-model="content" class="form-control" name="content" id="content" cols="30" rows="10"></textarea>
                </div>
                
                <div class="col-12 mt-3">
                    <label for="image" class="form-label fs-4">Ajouter une image (format png, jpg et jpeg) :</label>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <input class="form-control" type="file" accept="image/png, image/jpeg, image/jpg" id="image">
                </div>
                
                <div class="col-12 col-md-6 text-end mb-3 pe-5">
                    <button :disabled="disableButton" class="btn btn-secondary btn-lg">Poster</button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostForm',
    data() {
        return {
            content: "",
            image: null
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

    }
}
</script>

