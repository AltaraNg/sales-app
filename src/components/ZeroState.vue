<template>
    <div class="flex items-center justify-center bg-white rounded-lg py-12">
        <div class="flex flex-col justify-items-center items-center box w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/3">
            <slot name="image"></slot>
            <p class="text-base font-semibold text-red-900 text-lg">{{ title }}</p>
            <p class="text-center text-sm font-medium" >{{ message }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "ZeroState",
    props: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
};
</script>