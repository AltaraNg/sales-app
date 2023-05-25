<template>
  <div class="altaraBlue h-full">
    <div
      class="w-full  h-full flex flex-col items-center altaraBlue bg-no-repeat"
      :style="`background-image: url('${registerBg2}');`"
    >
      <div class="w-full sm:px-3 md:px-36 lg:px-64 relative pb-10">
        <div class="flex flex-col items-center justify-center mt-10 px-10">
          <div class="flex justify-center absolute top left-0 items-start">
            <router-link to="/" class="-mt-6 ml-3">
              <button
                class="
                  bg-white
                  text-black
                  rounded
                  px-8
                  py-2
                  cursor-pointer
                  font-semibold
                  text-base
                "
              >
                Home
              </button>
            </router-link>
            <router-link to="/pricing" class="-mt-6 ml-3">
            <button
              class="
                bg-white
                text-black
                rounded
                px-8
                py-2
                cursor-pointer
                font-semibold
                text-base
              "
            >
              Back
            </button>
            </router-link>
          </div>
          <h3
            class="
              text-white
              tracking-wide
              lg:text-2xl
              text-md
              font-black
              text-center
              pb-4
              mt-16
            "
          >
            Do The Math, Calculate Your Cash Loans for Bi-Monthly Repayment
          </h3>
        </div>
        <form>
          <div class="flex flex-col item-start mx-3 md:mx-6 lg:mx-0 mt-3">
            <label class="text-white font-bold text-lg">Amount:</label>
            <input
                v-if="!starterCashState"
                type="number"
                class="form-control w-full px-5 custom-select bg-white rounded-md py-4 font-semibold text-lg"
                v-model="inputValue"
                @input="selectedItem"
            />
            <select 
                  v-else 
                  v-model="inputValue" 
                  class="form-control w-full px-5 custom-select bg-white rounded-md py-4 font-semibold text-lg"
                  @change="selectedItem"
                  >
                  <option value="0" disabled selected hidden>Select any amount</option>
              <option v-for="(starterCashLoan, index) in starterCashLoans" :key="index" >{{starterCashLoan}}</option>
            </select>
          </div>
        </form>
      </div>
      <div
         v-if="select_product"
        class=" flex lg:px-24 items-stretch px-4 mb-10 flex-wrap lg:flex-nowrap gap-2"
      >
        <div
          v-for="(businessType, index) in businessTypes"
          :key="index"
          class=" flex-1 justify-center flex flex-wrap"
        >
          
          <Buttons
            :getResultMobile="SelectedBusinessType"
            :business_type="businessType"
          />
        </div>
      </div>
      <div
        v-if="select_product == false"
        class="
          bg-red-500
          alert
          rounded-full
          shadow-lg
          flex
          -mt-4
          animate-bounce
          px-5
          mx-3 mx-8
          py-3
          items-center
          flex
          justify-center
        "
      >
        <p
          class="text-white text-center font-semibold lg:text-lg md:text-2xl mr-2"
        >
          PLEASE ENTER ANY AMOUNT
        </p>
        <ArrowUp />
      </div>

      <div class="lg:w-11/12 w-full" v-else>
        <router-view
        ref="Result"
          :businessTypes = "businessTypes"
          :repaymentDuration="repaymentDuration"
          :downPaymentRates="downPaymentRates"
          :getResultMobile="ResultMobile"
          :selectedDownpayment="selectedDownpayment"
          :computedGetCalc="computedGetCalc"
          :downpaymentCalculations="downpaymentCalculations"
        >
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import registerBg2 from "@/assets/img/register_bg_2.png";
import AutoComplete from "@/components/Autocomplete/AutocompleteSearch.vue";
import {calculate, cashLoan} from "../utilities/calculator";
import { get, post } from "../utilities/api";
import ArrowUp from "../components/svgs/arrowup.vue";
import Buttons from "../components/buttons/cashbuttons.vue";
export default {
  data() {
    return {
      firstResult:{},
      registerBg2,
      apiUrls: {
        getProduct: `/api/inventory`,
        getCalculation: `/api/price_calculator`,
        businessTypes: `/api/business_type?limit=30`,
        downPaymentRates: `/api/down_payment_rate`,
        repaymentDuration: `/api/repayment_duration`,
      },
      selectedProduct: {},
      products: [],
      businessTypes: [],
      product: "",
      downPaymentRates: [],
      eachDownpayment: {},
      select_product: false,
      downPaymentArr: [],
      selectedDownpayment: null,
      downpaymentCalculations: [],
      repaymentDuration: [],
      calculation:[],
      inputValue:"",
      starterCashState:false,
      starterCashLoans:[],
    }
  },
  components: {
    AutoComplete,
    ArrowUp,
    Buttons,
  },
  computed: {
    computedGetCalc() {
      return this.downpaymentCalc();
    },

  },

  async mounted() {
    this.multiples(5000, 70000,170000)
    this.checkRoute()
    await this.getCalculation();
    await this.getBusinessTypes();
    await this.getDownPaymentRates();
    await this.getRepaymentDuration();
  },

  watch:{
      $route(newRoute, oldRoute){  
          this.checkRoute(newRoute)  
    },
    
  },   
  methods: {
      multiples(range,from, to){
        for (let i = from;  i <=to; i += range) {
      this.starterCashLoans.push(i);
  }
    },
  checkRoute(){
      if(this.$route.params.slug.includes("ap_starter_cash_loan") ){
            this.starterCashState = true
            this.inputValue =0
          }else{
            this.starterCashState = false
          }
      },
    getFirstResult(){
        this.firstResult =  this.downpaymentCalculations.filter((result)=>{
        return result.actualDownpayment > 0;
      })[0]
    },
    selectedItem(value) {
      this.selectedProduct = value;
      this.select_product = true;
      this.downpaymentCalc();
      this.getFirstResult()
      
      this.SelectedBusinessType(this.firstResult?.re_duration, this.firstResult?.percent ) ;
    },
    SelectedBusinessType(repayduration = this.firstResult?.re_duration, percent = this.firstResult?.percent){
      this.getFirstResult();
       this.selectedDownpayment = this.downpaymentCalculations.find(
        (result) => {
          return result.re_duration == repayduration && result.percent == percent;
        }
      ) ;
      console.log(this.selectedDownpayment, 'selectedDownpayment');
      console.log(this.firstResult, 'firstResult')
    },
    ResultMobile(repayduration, percent) {
      this.SelectedBusinessType(repayduration, percent)
       this.selectedDownpayment && percent ? this.$refs?.Result?.PreviewAmmortizationMobile(): '';
    },

    async getRepaymentDuration() {
      try {
        const fetchRepaymentDuration = await get(
          this.apiUrls.repaymentDuration
        );
        this.repaymentDuration = fetchRepaymentDuration?.data?.data?.data;
        this.repaymentDuration = this.repaymentDuration.filter((item) => {
          return (
            item.name?.includes("six_months") ||
            item.name?.includes("nine_months") ||
            item.name?.includes("twelve_months")
          );
        }).sort((a,b)=> b.value - a.value) 
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    downpaymentCalc() {
      let downPaymentArr = [];
      this.repaymentDuration.forEach((repayment_duration) => {
        this.downPaymentRates.forEach((paymentRate) => {
          let business_type = this.businessTypes.find(
            (item) => item.slug == this.$route.params.slug
          );
          let filteredBizType = this.calculation.filter((param) => {
            return (
              business_type.id === param?.business_type_id &&
              paymentRate.id === param?.down_payment_rate_id &&
              repayment_duration.id === param?.repayment_duration_id
            );
          });
          const {
            total,
            actualDownpayment,
            actualRepayment,
            biMonthlyRepayment,
          } = cashLoan(
            this.inputValue,
            paymentRate,
            filteredBizType[0],
            repayment_duration?.value
          );
          downPaymentArr.push({
            re_duration: repayment_duration.id,
            percent: paymentRate["percent"],
            down_payment_rate_id:paymentRate.id,
            businessType: business_type.id,
            total,
            FixedRepayment:true,
            actualDownpayment,
            actualRepayment,
            biMonthlyRepayment,
          });
        });
      });
      this.downpaymentCalculations = downPaymentArr;
      return downPaymentArr;
    },
    async getDownPaymentRates() {
      try {
        const fetchDownPaymentRates = await get(this.apiUrls.downPaymentRates);
        this.downPaymentRates = fetchDownPaymentRates?.data?.data?.data;
        this.downPaymentRates = this.downPaymentRates.filter((item) =>  item.name =="twenty" || item.name == "ten" || item.name == "forty").sort((a, b) => {
          return a.percent - b.percent;
        });
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getCalculation() {
      try {
        const fetchGetCalclations = await get(this.apiUrls.getCalculation);
        const unwrapped = fetchGetCalclations?.data?.data;
        this.calculation = unwrapped;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getBusinessTypes() {
      try {
        const fetchBusinessTypes = await get(this.apiUrls.businessTypes);
        this.businessTypes = fetchBusinessTypes?.data?.data?.data;
        this.businessTypes = this.businessTypes.filter((item) => {
          return !(
            item.status == 0 ||
            item.slug.includes("ac") ||
            item.slug.includes("ap_cash_n_carry") ||
            item.slug.includes("ap_products") ||
            item.slug.includes("ap_no_bs_product")
            );
            
        });
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    

  },
};
</script>
<style scoped>
.alert {
  margin-bottom: 200%;
}
.top {
  top: 50px;
}
</style>
