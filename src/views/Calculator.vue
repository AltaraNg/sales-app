<template>
    <div class="altaraBlue h-full">
          <div class="  w-full h-full flex flex-col items-center justify-center altaraBlue  bg-no-repeat bg-full   "
          :style="`background-image: url('${registerBg2}');`">
        <div class="w-full  sm:px-3 md:px-36 lg:px-64 pb-20 lg:pb-10  ">
            <div class=" flex flex-col items-center justify-center mt-10 px-10 ">
                <h3 class="text-white tracking-wide text-2xl font-black text-center pb-4 " >
                    Do The Math, Calculate Your  Product/Cash Loans
                </h3>           
            </div>
            <form >    
                <div class="flex flex-col item-start mx-3 md:mx-6 lg:mx-0 mt-3 " >
                    <label class="text-white  font-bold text-base" >Product Name</label>
                    <AutoComplete
                    v-on:childToParent="selectedItem"
                  :apiUrl="apiUrls.getProduct"
                />
                </div>
            </form>
        </div>
        <div class="md:flex md:flex-col lg:hidden items-center w-full">
        <div class="flex justify-center md:space-x-20 justify-evenly mb-20">
            <button class="rounded-full w-16 h-16 text-white text-3xl bg-blue-500">20%</button>
            <button class="rounded-full w-16 h-16 text-white text-3xl bg-red-500">40%</button>
            <button class="rounded-full w-16 h-16 text-white text-3xl bg-green-400">60%</button>
            <button class="rounded-full w-16 h-16 text-white text-3xl bg-yellow-500">80%</button>
        </div>
        <!-- work in progress dummydata -->
        <div class="rounded-lg flex flex-col md:px-8 py-8 px-4  bg-white shadow-2xl h-auto w-11/12 md:w-9/12 mx-auto mb-10">
        <p class="text-lg font-semibold text-red-500 ">Altara Credit Product</p>
        <div class="flex items-center justify-between mt-10">
            <div class="flex-col items-center">
                <div class="rounded-lg px-4 md:px-8 py-1 text-xs md:text-sm font-semibold bg-red-100">Initial Payment</div>
                <p class="amount font-bold text-2xl text-center">₦ 20,900.00</p>
            </div>
             <div class="flex-col items-center">
                <div class="rounded-lg px-4 md:px-8 py-1 text-xs md:text-sm font-semibold bg-red-100">Monthly Repayment</div>
                <p class="amount font-bold text-2xl text-center">₦ 20,900.00</p>
            </div>
        </div>
        <div class="flex items-center justify-between mt-16">
            <div class="flex-col items-center">
                <div class="rounded-lg px-4 md:px-8 py-1 text-xs md:text-sm font-semibold bg-red-100">Total Repayment</div>
                <p class="amount font-bold text-2xl text-center">₦ 20,900.00</p>
            </div>
             <div class="flex-col items-center">
                <div class="rounded-lg px-4 md:px-8 py-1 text-xs md:text-sm font-semibold bg-red-100">Total Product Price</div>
                <p class="amount font-bold text-2xl text-center">₦ 20,900.00</p>
            </div>
        </div>
        </div>
        </div>
        <div class="hidden px-16 py-8  mb-8  bg-white rounded-lg  lg:flex flex-col ">
            <p class="font-black text-2xl tracking-wid leading-3 mb-4">Altara Credit Product</p>
                <table class="flex flex-col justify-center items-evenly   ">
                    <thead class="my-2 px-3 pt-4 flex justify-evenly items-center space-x-10 ">
                        <td class="border flex-grow ml-24"></td>
                        <td class= "font-bold text-lg">Initial Payment</td>
                        <td class= "font-bold text-lg">Monthly Repayment</td>
                        <td class= "font-bold text-lg">Total Repayment</td>
                        <td class= "font-bold text-lg">Total Product Price</td>
                    </thead>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20  bg-blue-100">
                        <td class= "font-bold text-lg">20%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20  bg-red-100">
                        <td class= "font-bold text-lg">40%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3  py-2 flex justify-evenly items-center space-x-20  bg-green-100">
                        <td class= "font-bold text-lg">60%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20 bg-yellow-100">
                        <td class= "font-bold text-lg">80%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                </table>
        </div>
        <div class="hidden px-16 py-8  mb-8  bg-white rounded-lg  lg:flex flex-col ">
            <p class="font-black text-2xl tracking-wid leading-3 mb-4">Altara Pay Product</p>
                <table class="flex flex-col justify-center items-evenly   ">
                    <thead class="my-2 px-3 pt-4 flex justify-evenly items-center space-x-10 ">
                        <td class="border flex-grow ml-24"></td>
                        <td class= "font-bold text-lg">Initial Payment</td>
                        <td class= "font-bold text-lg">Monthly Repayment</td>
                        <td class= "font-bold text-lg">Total Repayment</td>
                        <td class= "font-bold text-lg">Total Product Price</td>
                    </thead>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20  bg-blue-100">
                        <td class= "font-bold text-lg">20%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20  bg-red-100">
                        <td class= "font-bold text-lg">40%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3  py-2 flex justify-evenly items-center space-x-20  bg-green-100">
                        <td class= "font-bold text-lg">60%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                    <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20 bg-yellow-100">
                        <td class= "font-bold text-lg">80%</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                        <td class="font-medium text-base">₦ 11,500.00</td>
                    </tr>
                </table>
        </div>

        
          </div>
    </div>
</template>

<script>
import registerBg2 from "@/assets/img/register_bg_2.png"; 
import AutoComplete from "@/components/Autocomplete/AutocompleteSearch.vue"
import calculate from "../utilities/calculator"
export default{
    data(){
        return{
            registerBg2,
              apiUrls: {
       getProduct: `/api/inventory`,
       downPaymentRates: `/api/down_payment_rate`,
      },
       selectedProduct: {},
       downPaymentRates: [],
        }
    },
    components:{
        AutoComplete
    },
      async mounted() {
    await this.getDownPaymentRates();
  },
    methods:{
        selectedItem(value) {
      this.selectedProduct = value;
    //   this.test0 = false;
    //   this.getCalc();
    },
    async getProduct() {
      try {
        const fetchProduct = await get(this.apiUrls.getProduct + this.product);
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
        async getDownPaymentRates() {
      try {
        const fetchDownPaymentRates = await get(this.apiUrls.downPaymentRates);
        this.downPaymentRates = fetchDownPaymentRates.data.data.data;
       console.log(fetchDownPaymentRates);

        
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
button, .amount{
    font-family: 'Nanum Pen Script', cursive;
}
</style>