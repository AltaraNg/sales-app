<template>
    <div>
            <router-link
                :to="{ name: 'Result', params: { name: rpayDuration.name } }"
                
                >
            <button
                class="
                w-full
                focus:outline-none
                font-semibold
                lg:text-lg
                text-base
                rounded-lg
                px-5
                py-3
                bg-white
                group-focus:text-yellow-300
                "
                :class="styleActiveRoute"
                                @click="getResultMobile(2, 20)"
            >

                {{ rpayDuration.name }}
            </button>
                </router-link>
        </div>                  
    
</template>

<script>
export default {
    props:{
        
        getResultMobile:{
            type: Function,
            required: true
        },
        rpayDuration:{
            type:Object
        }                 
    },
    computed:{
    styleActiveRoute(){
      let color = '';
      if(this.$route.path == '/calculator/'+ this.rpayDuration.name ){
        return color = 'bg-red-700 text-white '
      }
    } 
    }
    

}
</script>

<style>

</style>