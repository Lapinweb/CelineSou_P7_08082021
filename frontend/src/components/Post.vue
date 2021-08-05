<template>
    <div class="row mb-5">
        <div class="col-12 col-md-9">
            <div class="card shadow border border-secondary">
                <div class="card-header bg-secondary">
                    <div class="row">
                        <div class="col">
                            <p class="mb-0 text-white">Publié par {{ post.fullName }}</p>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <p class="card-text fs-5">{{ post.content }}</p>
                    
                </div>

                <img :src="post.imageUrl" alt="" class="card-img-bottom">

                <div class="card-footer bg-secondary">
                    <div class="row">
                        <div class="col">
                            <p class="mb-0 text-white">Le 02/08/2021 à 23:26</p>
                        </div>                      
                    </div>
                </div>
            </div>                    
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            post: {
                fullName: "Céline Sou",
                content: "Ceci n'est pas un poste !",
                createdAt: '2021-08-02 23:36:05',
                imageUrl: ""                
            }
        }
    }
}
</script>