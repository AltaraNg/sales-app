<template>
  <div class="altaraBlue h-full">
    <div
      class="w-full h-full flex flex-col items-center  altaraBlue bg-no-repeat"
      :style="`background-image: url('${registerBg2}');`"
    >
    
      <div class="w-full sm:px-3 md:px-36 lg:px-64 relative pb-10">
        <div
          class="flex  flex-col items-center justify-center mt-10 px-10"
        >
        <div class="flex justify-center absolute top left-0  items-start">
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
              -mt-6
              ml-3
            "
            @click="$router.push('/admin/dashboard')"
          >
            Home
          </button>
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
              -mt-6
              ml-3
            "
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
          >
            Back
          </button>
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
            Do The Math, Calculate Your Product/Cash Loans for Six
            Months/Bi-Monthly Repayment
          </h3>
        </div>
        <form>
          <div class="flex flex-col item-start mx-3 md:mx-6 lg:mx-0 mt-3">
            <label class="text-white font-bold text-base">Product Name</label>
            <AutoComplete
              v-on:childToParent="selectedItem"
              :apiUrl="apiUrls.getProduct"
            />
          </div>
        </form>
      </div>
      <div v-if="select_product" class="flex px-4  mb-10 flex-wrap gap-2  justify-center items-center">
        
        <div v-for="(rpayDuration, index) in repaymentDuration" :key="index" class=" flex-1" >
      <Buttons  :getResultMobile="getResultMobile" :rpayDuration="rpayDuration"/>    
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
          class="text-white text-center font-semibold text-lg md:text-2xl mr-2"
        >
          PLEASE SELECT A PRODUCT
        </p>
        <ArrowUp />
      </div>
    

      <div class="lg:w-auto w-full" v-else>
        <router-view
          :businessTypes="businessTypes"
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
import {calculate} from "../utilities/calculator";
import { get, post } from "../utilities/api";
import ArrowUp from "../components/svgs/arrowup.vue";
import Buttons from "../components/buttons/buttons.vue"
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
    };
  },
  components: {
    AutoComplete,
    ArrowUp,
    Buttons
  },
  computed: { 
    computedGetCalc() {
      return this.downpaymentCalc();
    },        
   
  },

  async mounted() {
    await this.getCalculation();
    await this.getProduct();
    await this.getBusinessTypes();
    await this.getDownPaymentRates();
    await this.getRepaymentDuration();
  },
  methods: {
    selectedItem(value) {
      this.selectedProduct = value;
      this.select_product = true;
      this.downpaymentCalc();
      this.getResultMobile(2, 20);
    },
    hasHistory() {
      return window.history.length > 2;
    },
    getResultMobile(bizId, percent) {
      this.selectedDownpayment = this.downpaymentCalculations.filter(
        (result) => {
          return result.bizId == bizId && result.percent == percent;
        }
      )[0];
    },

    async getRepaymentDuration() {
      try {
        const fetchRepaymentDuration = await get(
          this.apiUrls.repaymentDuration
        );
        this.repaymentDuration = fetchRepaymentDuration?.data?.data?.data;
        
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    downpaymentCalc() {
      let downPaymentArr = [];
      this.businessTypes.forEach((bizType) => {
        this.downPaymentRates.forEach((paymentRate) => {

          let repayment_duration = this.repaymentDuration.find((item)=> item.name == this.$route.params.name )

          let filteredBizType = this.calculation.filter((param) => {
            return (
              bizType.id === param?.business_type_id &&
              paymentRate.id === param?.down_payment_rate_id &&
              repayment_duration.id === param?.repayment_duration_id
            );
          });

          const {total, actualDownpayment, actualRepayment, biMonthlyRepayment,  } = calculate(
            this.selectedProduct.price,
            paymentRate,
            filteredBizType[0],
            repayment_duration?.value
          );
          downPaymentArr.push({
            bizId: bizType.id,
            percent: paymentRate["percent"],
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
    async getProduct() {
      try {
        const fetchProduct = await get(this.apiUrls.getProduct + this.product);
        this.products = fetchProduct?.data?.data?.data;
        this.products.find((item) => {
          return item.product_id == this.selectedProduct.product_id;
        });
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getDownPaymentRates() {
      try {
        const fetchDownPaymentRates = await get(this.apiUrls.downPaymentRates);
        this.downPaymentRates = fetchDownPaymentRates?.data?.data?.data;
        this.downPaymentRates = this.downPaymentRates.filter((item) => {
          return !(
            item.name.includes("plus") ||
            item.name.includes("zero") ||
            item.name.includes("ten")
          );
        });
        this.downPaymentRates = this.downPaymentRates.sort((a, b) => {
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
          return item.name.includes("Products");
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
.top{
  top:50px;
}


</style>