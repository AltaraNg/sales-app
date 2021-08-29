<template>
  <portal>
      <div class=" fixed z-50 justify-center items-center top-0  w-screen lg:hidden
                  h-full flex  bg-black bg-opacity-25 overlay" 
            :class="state ? 'block': 'hidden'"
             ref="overlay" @click="clickOverlay">
        <div class="bg-gray-100 my-1/6 lg:px-8 md:px-5  pb-9 border h-auto  rounded-md flex flex-col  lg:mx-auto lg:w-5/12 md:w-2/3 w-11/12  overflow-y-scroll" >
            <div class="flex justify-between items-center pt-5">
           <div>
                <h3 class="font-bold lg:text-2xl md:text-lg text-base text-gray-900">{{title}}</h3> 
              </div>

                <span v-if="!hideCloseButton"
                      class="text-primary text-xl font-semibold hover:text-black no-undeline cursor-pointer" 
                      @click='toggleModal'>&times;</span>
            </div>

            <div class="mt-4 flex flex-col"> 
              <slot></slot>
               <!-- <p>Some text in the Modal.This will be mounted as a child element of the auto-generated  instead of somewhere inside the child tree of .</p>  -->
            </div>
        </div>
      </div>
    </portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
// import
export default {
  components: {
    Portal,
  },
  props:{
    onClose:{
      type: Function,
      required:true
    },
    title:{
      type: String, 
      default:"",
    },
    overlayClose:{
      type: Boolean,
      default:true
    },
   

  },
  data(){
      return {
        state: true  
      }
  },
  methods:{
      toggleModal(){
          this.state= !this.state

          if (!this.state && this.onClose) this.onClose()
      },
      clickOverlay(event){
        let overlay = this.$refs.overlay
        if(event.target == overlay){
          //only toggle modal closure if user wants to modal to close when overlay is clicked
         if (this.overlayClose) this.toggleModal();
        }
      }


  },
  mounted(){
    this.escClose
  }
}
</script>

