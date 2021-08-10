<template>
    <div class="col-12 col-md-9 my-2">
        <div class="row">
            <div class="col-9 d-flex align-items-center">
                <p class="mb-0 mx-2">{{fullName}}</p> 
            </div>
            
            <div class="col-3 text-end">
                <button @click="emitDeleteComment" class="btn py-0 fs-5" v-if="showButtons">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="bg-white border border-secondary border-3 rounded-3 shadow">
                <p class="my-2 mx-2 pre-wrap">{{comment}}</p>
            </div>            
        </div>

        <div class="row">
            <div class="col-3">
                <button @click="emitUpdateInput" class="btn py-0 fs-5" v-if="showButtons" data-bs-toggle="modal" data-bs-target="#commentModal">
                    <i class="far fa-edit"></i>
                </button>
            </div>
            <div class="col-9 d-flex justify-content-end align-items-center">
                <p class="mb-0 mx-2">{{date}}</p> 
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Comment',
    props: {
        fullName: String,
        comment: String,
        date: String,
        showButtons: Boolean
    },
    methods: {
        emitDeleteComment() {
            this.$emit('clickDeleteComment');
        },
        emitUpdateInput() {
            this.$emit('clickUpdateInput');
        }
    }
}
</script>