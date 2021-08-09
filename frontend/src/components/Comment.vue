<template>
    <div class="col-12 col-md-9 my-3">
        <div class="row">
            <div class="col-10">
                <p class="mb-0 mx-2">{{fullName}}</p> 
            </div>
            
            <div class="col-2 text-end">
                <button @click="emitDeleteComment" class="btn">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="row m-0">
            <div class="bg-white border border-secondary border-3 rounded-3 shadow">
                <p class="my-2 mx-2">{{comment}}</p>
            </div>            
        </div>

        <div class="row text-end">
            <p class="mb-0 mx-2">{{date}}</p>                    
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        fullName: String,
        comment: String,
        date: String
    },
    methods: {
        emitDeleteComment() {
            this.$emit('clickDeleteComment');
        }
    }
}
</script>