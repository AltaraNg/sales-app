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
            <form>    
                <div class="flex flex-col item-start mx-3 md:mx-6 lg:mx-0 mt-3 " >
                    <label class="text-white  font-bold text-base" >Product Name</label>
                    <AutoComplete
                    v-on:childToParent="selectedItem"
                  :apiUrl="apiUrls.getProduct"
                />
                </div>
            </form>
        </div>
        <!-- mobile view -->
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
        <!-- desktop view -->
        <div class="hidden px-16 py-8  mb-8  bg-white rounded-lg  lg:flex flex-col " v-for="(b_type, index) in businessTypeCalc" :key="index">
          <div>
            <p class="font-black text-2xl tracking-wid leading-3 mb-4" >{{b_type.name}}</p>
                <table class="flex flex-col justify-center items-evenly   ">
                    <thead class="my-2 px-3 pt-4 flex justify-evenly items-center space-x-10 ">
                        <td class=" flex-grow pl-24"></td>
                        <td class= "font-bold text-lg">Initial Payment</td>
                        <td class= "font-bold text-lg">Bi-Monthly Repayment</td>
                        <td class= "font-bold text-lg">Total Repayment</td>
                        <td class= "font-bold text-lg">Total Product Price</td>
                    </thead>
                    <tbody v-for="(downpayments, index) in downpaymentCalc" :key= "index">
                          
                        <tr class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20 " v-if="(downpayments.bizId == b_type.id)" :class='downpayments.percent == 20 ? "bg-blue-100" : downpayments.percent == 40 ? "bg-red-100" : downpayments.percent == 60 ? "bg-green-100" : "bg-yellow-100"'>
                            <td class= "font-bold text-lg -mr-6 -ml-10" ref="downpayment">{{downpayments.percent}}%</td>
                            <td class="font-medium text-base">{{$formatCurrency(Math.ceil(downpayments.actualDownpayment)) || ""}}</td>
                            <td class="font-medium text-base">{{$formatCurrency(Math.ceil(downpayments.actualRepayment /12)) || "" }}</td>
                            <td class="font-medium text-base">{{ $formatCurrency(Math.ceil(downpayments.actualRepayment))|| "" }}</td>
                            <td class="font-medium text-base">{{$formatCurrency( Math.ceil(downpayments.total))|| "" }}</td>
                        </tr>
                   </tbody>
                </table>
          </div>
        </div>


        
          </div>
    </div>
</template>

<script>
import registerBg2 from "@/assets/img/register_bg_2.png"; 
import AutoComplete from "@/components/Autocomplete/AutocompleteSearch.vue"
import calculate from "../utilities/calculator"
import { get, post } from "../utilities/api"
export default{
    data(){
        return{
            registerBg2,
              apiUrls: {
       getProduct: `/api/inventory`,
       getCalculation: `/api/price_calculator`,
       businessTypes: `/api/business_type`,
       downPaymentRates: `/api/down_payment_rate`,
      },
       selectedProduct: {},
       downPaymentRates: [],
       products:[],
       businessTypes: [],
       product: "",
       repaymentCycle:14,
       repaymentDuration: 180,
       calculation:[],
        fPayment: "",
        tpayment:"",
        pPrice: "",
        rPayment: "",
        downPaymentRates: [],
        eachDownpayment:{},
        totals:[],
         test1: true,
         downPaymentArr:[]
        }
    },
    components:{
        AutoComplete
    },
    computed:{
      businessTypeCalc(){
        return this.businessTypes.map((item)=>{
          return item;
        })
      },
      // in progress
      downpaymentCalc(){
        let  downPaymentArr = [];
        this.businessTypes.map((bizType)=>{
            return this.downPaymentRates.map((paymentRate)=>{
             let filteredBizType = this.calculation.filter((param)=>{
               return bizType.id === param.business_type_id && paymentRate.id === param.down_payment_rate_id 

             });
             console.log('filteredBizType', filteredBizType);
            const { total, actualDownpayment, actualRepayment }= calculate(
          this.selectedProduct.price,
          paymentRate,
          filteredBizType[0]
        );
        console.log({bizId:bizType.id,percent: paymentRate['percent'], total, actualDownpayment, actualRepayment })

          console.log('paymentRate', paymentRate)
          downPaymentArr.push({bizId:bizType.id,percent: paymentRate['percent'],total, actualDownpayment, actualRepayment})
        })
        });
        console.log('downPaymentArr', downPaymentArr)
        return downPaymentArr
        
      }
    },
      async mounted() {
    await this.getCalculation();
    await this.getProduct();
    await this.getBusinessTypes();
     await this.getDownPaymentRates();
    //  this.getCalc()
  
  },

    methods:{
    selectedItem(value) {
      this.selectedProduct = value;
    },
        

    async getProduct() {
      try {
        const fetchProduct = await get(this.apiUrls.getProduct + this.product);
        this.products= fetchProduct.data.data.data
       const found= this.products.find((item)=>{
            return item.product_id == this.selectedProduct.product_id; 
        })
        return found
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
        async getDownPaymentRates() {
      try {
        const fetchDownPaymentRates = await get(this.apiUrls.downPaymentRates);
        this.downPaymentRates = fetchDownPaymentRates.data.data.data;
        console.log(this.downPaymentRates);
        this.downPaymentRates = this.downPaymentRates.filter((item) => {
						return !((item.name.includes('plus')) || (item.name.includes('zero')) || (item.name.includes('ten')));
					});
        this.downPaymentRates = this.downPaymentRates.sort((a, b)=>{
            return a.percent-b.percent;
            
        })

        console.log(this.downPaymentRates, "downPaymentRates");
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
   
       async getCalculation() {
      try {
        const fetchGetCalclations = await get(this.apiUrls.getCalculation);
       const unwrapped = fetchGetCalclations.data.data;
        this.calculation = unwrapped;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getBusinessTypes() {
    try {
        const fetchBusinessTypes = await get(this.apiUrls.businessTypes );
        this.businessTypes = fetchBusinessTypes.data.data.data;
          this.businessTypes = this.businessTypes.filter(item => {
            return item.name.includes("Products")
        });
        console.log(this.businessTypes);
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