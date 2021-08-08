<template>
    <div class="col-12 col-md-9">
        <div class="">
            <p class="mb-0 mx-2">{{fullName}}</p>                  
        </div>            
        <div class="bg-white border border-secondary border-3 rounded-3 shadow">

            <p class="my-2 ms-3">{{comment}}</p>
        </div>
        <div class="text-end">
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
    }
}
</script>