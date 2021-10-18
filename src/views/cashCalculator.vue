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
          class=" flex-1 justify-center flex "
        >
          
          <Buttons
            :getResultMobile="getResultMobile"
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

      <div class="lg:w-auto w-full" v-else>
        <router-view
          :repaymentDuration="repaymentDuration"
          :downPaymentRates="downPaymentRates"
          :getResultMobile="getResultMobile"
          :selectedDownpayment="selectedDownpayment"
          :computedGetCalc="computedGetCalc"
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
      registerBg2,
      apiUrls: {
        getProduct: `/api/inventory`,
        getCalculation: `/api/price_calculator`,
        businessTypes: `/api/business_type`,
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
      starterCashLoans:[45000, 65000,70000]
      
    };
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
    this.checkRoute()
    await this.getCalculation();
    await this.getBusinessTypes();
    await this.getDownPaymentRates();
    await this.getRepaymentDuration();
  },

  watch:{
      $route(newRoute, oldRoute){  
          this.checkRoute(newRoute)   
    }
  },   
  methods: {
  checkRoute(){
      if(this.$route.params.id == 9 || this.$route.params.id == 7){
            this.starterCashState = true
            this.inputValue =0
          }else{
            this.starterCashState = false
          }
      },
    selectedItem(value) {
      this.selectedProduct = value;
      this.select_product = true;
      this.downpaymentCalc();
      this.getResultMobile(2, 20);
    },
    getResultMobile(repayduration, percent) {
      this.selectedDownpayment = this.downpaymentCalculations.filter(
        (result) => {
          return result.re_duration == repayduration && result.percent == percent;
        }
      )[0];
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
            item.name?.includes("three_months")
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
            (item) => item.id == this.$route.params.id
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
            businessType: business_type.name,
            total,
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
        this.downPaymentRates = this.downPaymentRates.filter((item) =>  item.name =="twenty").sort((a, b) => {
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
            item.name.includes("Products") ||
            item.name.includes("Rentals") ||
            item.name.includes("Credit") ||
            item.name.includes("Employee")
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