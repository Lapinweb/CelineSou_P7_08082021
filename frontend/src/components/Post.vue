<template>
    <div class="row mb-5">
        <div class="col-12 col-md-9">
            <div class="card shadow border border-secondary">
                <div class="card-header bg-secondary">
                    <div class="row my-2">
                        <div class="col">
                            <p class="mb-0 text-white">Publié par {{ fullName }}</p>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <p class="card-text fs-5">{{ content }}</p>
                    
                </div>

                <img :src="imageUrl" alt="" class="card-img-bottom">

                <div class="card-footer bg-secondary">
                    <div class="row">
                        <div class="col-9 d-flex align-items-center">
                            <p class="mb-0 text-white">{{date}}</p>
                        </div>

                        <div class="col-3 text-end">
                            <button class="btn text-white fs-5">
                                <i class="fas fa-comments"></i>
                            </button>
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
    props:{
        fullName: String,
        content: String,
        date:  String,
        imageUrl: String
    }
}
</script>