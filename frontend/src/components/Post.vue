<template>
    <div class="col-12 col-md-9">
        <div class="card shadow border border-secondary">
            <div class="card-header bg-secondary pe-2">
                <div class="row">
                    <div class="col d-flex align-items-center">
                        <p class="mb-0 text-white">{{ fullName }}</p>
                    </div>

                    <div v-if="showModifyButtons" class="col-5 col-sm-3 text-end">
                        <div class="dropdown">
                            <button class="btn btn-secondary border border-light dropdown-toggle" type="button" id="menuModifyPost" data-bs-toggle="dropdown" aria-label="menu modify post">
                                <i class="fas fa-edit"></i>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><router-link :to="{name: 'PostModify', params: {id: postId}}" class="dropdown-item" role="menuitem">Modifier</router-link></li>
                                <li><button @click="emitDeletePost" class="dropdown-item" role="menuitem">Supprimer</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="position-relative">
                <router-link :to="{name: 'SinglePost', params: {id: postId}}" class="text-dark text-decoration-none" :class="{'stretched-link': linkToPost}" aria-label="lien post">
                </router-link>
                
                <div class="card-body position-relative">

                    <p class="card-text pre-wrap">{{ content }}</p>
                </div>

                <img v-if="imageUrl != null" :src="imageUrl" class="card-img-bottom p-1">                
            </div>

            <div class="card-footer bg-secondary">
                <div class="row">
                    <div class="col-7 d-flex align-items-center">
                        <p class="mb-0 text-white">{{date}}</p>
                    </div>

                    <div v-if="showCommentButton" class="col-5 text-end">
                        <router-link :to="{name: 'SinglePost', params: {id: postId}}" class="btn btn-outline-secondary border border-light text-white fs-5" aria-label="lien commentaires">
                            <i class="fas fa-comments"></i>
                        </router-link>                            
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
        showModifyButtons: Boolean,
        showCommentButton: Boolean,
        linkToPost: Boolean
    },
    methods: {
        emitDeletePost() {
            this.$emit('clickDeletePost')
        }
    }
}
</script>