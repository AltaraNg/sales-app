<template>
    <div class="flex flex-col px-8 pb-10">
        <div class="items-center flex justify-between pb-3">
            <p class="text-gray-700">{{type}}:</p>
            <p class="text-black font-bold">{{amount}}</p>
        </div>
        <hr class="bg-gray-400">
    </div>
</template>
<script>
export default {
    props:{
        type:{
            type: String,
            required: true
        },
        amount:{
            type: String,
            required: true
        }
    }
    
}
</script>