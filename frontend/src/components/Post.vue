<template>
    <div class="col-12 col-md-9">
        <div class="card shadow border border-secondary">
            <div class="card-header bg-secondary pe-2">
                <div class="row">
                    <div class="col d-flex align-items-center">
                        <p class="mb-0 text-white">{{ fullName }}</p>
                    </div>

                    <div v-if="postUserId == userId" class="col-5 col-sm-3 text-end">
                        <div class="dropdown">
                            <button class="btn btn-secondary border border-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                <i class="fas fa-edit"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item">Modifier</button></li>
                                <li><button class="dropdown-item">Supprimer</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <router-link :to="{name: 'SinglePost', params: {id: postId}}" class="text-dark text-decoration-none">
                <div class="card-body">
                    <p class="card-text">{{ content }}</p>
                </div>

            <img v-if="imageUrl != null" :src="imageUrl" class="card-img-bottom">
            </router-link>


            <div class="card-footer bg-secondary">
                <div class="row">
                    <div class="col-7 d-flex align-items-center">
                        <p class="mb-0 text-white">{{date}}</p>
                    </div>

                    <div class="col-5 text-end">
                        <button class="btn btn-outline-secondary border border-light text-white fs-5">
                            <i class="fas fa-comments"></i>
                        </button>                            
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
        imageUrl: String,
        modifyButtons: {
            type: Boolean,
            default: false
        },
        postId: Number,
        postUserId: Number,
        userId: Number
    },
}
</script>