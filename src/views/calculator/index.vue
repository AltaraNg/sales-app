<template>
    <div class="h-full ">
         <div
          class="  w-full flex items-center justify-center  h-full bg-altaraBlue bg-no-repeat bg-full   "
          :style="`background-image: url('${registerBg2}');`">
        <div class="w-full  lg:w-3/5 lg:ml-24 ml-0 mx-3 md:mx-6 lg:mx-0 ">
            <div class=" flex flex-col items-center justify-center mt-24 px-10 ">
                <h3 class="text-white tracking-wide text-2xl font-black text-center pb-6 " >
                    Do The Math, Calculate Your  Product/Cash Loans
                </h3>
                <p class="text-white text-center font-normal text-md">
                    Fill in the form below to calculate your initial payment and renewal payment
                </p>            
            </div>
            <form >    
                <div class="flex flex-col item-start mx-3 md:mx-6 lg:mx-0 mt-4 " v-for="(data, index) in formdata" :key="index" >
                    <label class="text-white  font-semibold text-base" >{{data.name}}</label>
                    <select id="product_name" name="product_name" class="form-select bg-white border-b-2  font-semibold text-lg" >
                        <option value="his" class=""  >
                            {{data.type}}
                        </option>
                    </select>
                </div>
                <div class="flex justify-end px-10">
                <button class="bg-white rounded px-8 py-3 cursor-pointer font-semibold mt-20 mb-8 text-altaraBlue" @click.prevent="toggleModal">Calculate Loan</button>
                </div>
            </form>
        </div>
        <calculator-result class="hidden lg:flex"/>
        <Modal v-if='modal==true' :onClose="onModalClose" >
          <calculator-result class="flex flex-col lg:hidden"/>
       
          
        </Modal>
          </div>
    </div>


</template>
<script>
import registerBg2 from "@/assets/img/register_bg_2.png"; 
import CalculatorResult from "@/components/Cards/calculator"
import Modal from '@/components/modal.vue'
export default {
    components:{
        Modal,
        CalculatorResult
    },
   data(){
       return{
           modal:false,
           formdata:[
               {
                   "name":"Product name",
                    "type":"145L HISENSE CHEST FREEZER +Eve 2kva"
                }, 
                {
                    "name":"Repayment cycle",
                     "type":"Bi-monthly"
                }, 
                {
                     "name": "Business Type",
                     "type":"Altara Credit Pro",
                }, 
                {
                    "name": "Repayment Duration",
                    "type": "Six months"
                },
                {
                    "name": "Downpayment Rates",
                    "type": "Six months"
                }
           ],
           registerBg2
           
       }
   } ,
   methods:{
    toggleModal(){
      this.modal =!this.modal;
    },
     onModalClose (){
      modalState.value = false
    }
   }
}
</script>