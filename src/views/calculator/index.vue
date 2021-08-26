<template>
    <div class="h-full ">
         <div
          class="  w-full flex items-center justify-center  h-full bg-altaraBlue bg-no-repeat bg-full   "
          :style="`background-image: url('${registerBg2}');`">
        <div class="w-full  lg:w-3/5 lg:ml-24 ml-0 mx-3 md:mx-6 lg:mx-0 ">
            <div class=" flex flex-col items-center justify-center mt-24 px-10 ">
                <h3 class="text-white tracking-wide text-2xl font-black text-center pb-6 ">
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
                <button class="bg-white rounded px-8 py-3 font-semibold mt-20 mb-8 text-altaraBlue">Calculate Loan</button>
                </div>
            </form>
        </div>
        <div class="hidden lg:flex lg:w-2/5 bg-white lg:flex-col pb-16  rounded my-20 mx-20 h-full  hover:shadow-2xl">
          <h3 class=" tracking-wider mb-32 leading-6 text-2xl font-bold text-center px-8 mt-16 text-black  ">
                   Your initial payment is <br><p class="underline pt-8"> ₦20,900.00</p>
         </h3>
         <Result type="Monthly Repayment" amount="₦ 11,500.00" />
         <Result type="Total Repayment" amount="₦ 124,956.00" />
         <Result type="Total Product Price" amount="₦ 147,500.00" />
        </div>
          </div>
    </div>


</template>
<script>
import registerBg2 from "@/assets/img/register_bg_2.png"; 
import Result from "@/components/Results/"
export default {
    components:{
        Result
    },
   data(){
       return{
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
   } 
}
</script>