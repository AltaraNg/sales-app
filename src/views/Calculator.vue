<template>
  <div class="altaraBlue h-full">
    <div
      class="
        w-full
        h-full
        flex flex-col
        items-center
        
        altaraBlue
        bg-no-repeat 
      "
      :style="`background-image: url('${registerBg2}');`"
    >
      <div class="w-full sm:px-3 md:px-36 lg:px-64 pb-10">
        <div class="flex flex-col items-center justify-center mt-10 px-10">
          <h3
            class="
              text-white
              tracking-wide
              lg:text-2xl text-md
              font-black
              text-center
              pb-4
            "
          >
            Do The Math, Calculate Your Product/Cash Loans for Six Months/Bi-Monthly Repayment
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
      
      <div v-if ="select_product == false" class="bg-red-500 alert rounded-full  shadow-lg flex -mt-4 animate-bounce px-5 mx-3 mx-8   py-3  lg:hidden items-center md:flex  justify-center">
        <p  class="text-white text-center font-semibold text-lg md:text-2xl mr-2 " >PLEASE SELECT A PRODUCT</p>
        <ArrowUp/>
      </div>
      <!-- mobile view -->
      <div  class="w-full"  v-else >
      <div 
        class="md:flex md:flex-col lg:hidden items-center w-full"
        v-for="biztype in businessTypes"
        :key="biztype.id"
      >
        <div
          class="
            rounded-lg
            flex flex-col
            md:px-8
            py-8
            px-4
            bg-white
            shadow-2xl
            h-auto
            w-11/12
            md:w-11/12
            mx-auto
            mb-10
          "
        >
          <div class="flex justify-center md:space-x-20  justify-evenly mb-4">
            <div v-for="dpayments in downPaymentRates" :key="dpayments.id">
              <button
                class="
                  rounded-full
                   d_buttons font-semibold
                  text-white text-lg
                  cursor-pointer
                  transform  hover:scale-125
                  bg-gray-500 focus:outline-none
                "
                @click="getResultMobile(biztype.id, dpayments.percent)"
                :class="
                  dpayments.percent == 20
                    ? 'bg-blue-500'
                    : dpayments.percent == 40
                    ? 'bg-red-500'
                    : dpayments.percent == 60
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                "
              >
                {{ dpayments.percent }}%
              </button>
            </div>
          </div>
          <p class="text-lg font-semibold" :class="toggletextColor">{{ biztype.name }}</p>
          <div class="flex items-center px-4 justify-between mt-8">
            <div class="flex-col items-center">
              <div
                class="
                  rounded-lg
                  px-4
                  md:px-8
                  py-1
                  text-xs
                  md:text-sm
                  font-semibold
                  
                "
                :class ="
                  toggleColor
                "
              >
                Initial Payment
              </div>
              <p class="amount font-bold text-lg text-center">
                {{
                  selectedDownpayment !== null &&
                  biztype.id === selectedDownpayment.bizId
                    ? $formatCurrency(
                        Math.ceil(selectedDownpayment.actualDownpayment)
                      )
                    : "₦0.00"
                }}
              </p>
            </div>
            <div class="flex-col items-center">
              <div
                class="
                  rounded-lg
                  px-4
                  md:px-8
                  py-1
                  text-xs
                  md:text-sm
                  font-semibold
                "
                :class="toggleColor"
              >
                Bi-Monthly Repayment
              </div>
              <p class="amount font-bold text-lg text-center">
                {{
                  selectedDownpayment !== null &&
                  biztype.id === selectedDownpayment.bizId
                    ? $formatCurrency(
                        Math.ceil(selectedDownpayment.actualRepayment / 12)
                      )
                    : "₦0.00"
                }}
              </p>
            </div>
          </div>
          <div class="flex items-center px-4 justify-between mt-12">
            <div class="flex-col items-center">
              <div
                class="
                  rounded-lg
                  px-4
                  md:px-8
                  py-1
                  text-xs
                  md:text-sm
                  font-semibold
                "
                :class="toggleColor"
              >
                Total Repayment
              </div>
              <p class="amount font-bold text-lg text-center">
                {{
                  selectedDownpayment !== null &&
                  biztype.id === selectedDownpayment.bizId
                    ? $formatCurrency(
                        Math.ceil(selectedDownpayment.actualRepayment)
                      )
                    : "₦0.00"
                }}
              </p>
            </div>
            <div class="flex-col items-center">
              <div
                class="
                  rounded-lg
                  px-4
                  md:px-8
                  py-1
                  text-xs
                  md:text-sm
                  font-semibold 
                "
                :class="toggleColor"
              >
                Total Product Price
              </div>
              <p class="amount font-bold text-lg text-center">
                {{
                  selectedDownpayment !== null &&
                  biztype.id === selectedDownpayment.bizId
                    ? $formatCurrency(Math.ceil(selectedDownpayment.total))
                    : "₦0.00"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- desktop view -->
      <div
        class="hidden px-16 py-8 mb-8 bg-white rounded-lg lg:flex flex-col"
        v-for="(b_type, index) in businessTypes"
        :key="index"
      >
        <div>
          <p class="font-black text-2xl tracking-wid leading-3 mb-4">
            {{ b_type.name }}
          </p>
          <table class="flex flex-col justify-center items-evenly">
            <thead
              class="my-2 px-3 pt-4 flex justify-evenly items-center space-x-10"
            >
              <td class="flex-grow pl-24"></td>
              <td class="font-bold text-lg">Initial Payment</td>
              <td class="font-bold text-lg">Bi-Monthly Repayment</td>
              <td class="font-bold text-lg">Total Repayment</td>
              <td class="font-bold text-lg">Total Product Price</td>
            </thead>
            <tbody
              v-for="(downpayments, index) in computedGetCalc"
              :key="index"
            >
              <tr
                class="
                  my-2
                  px-3
                  py-2
                  flex
                  justify-evenly
                  items-center
                  space-x-20
                "
                v-if="downpayments.bizId == b_type.id"
                :class="
                  downpayments.percent == 20
                    ? 'bg-blue-100'
                    : downpayments.percent == 40
                    ? 'bg-red-100'
                    : downpayments.percent == 60
                    ? 'bg-green-100'
                    : 'bg-yellow-100'
                "
              >
                <td class="font-bold text-lg -mr-6 -ml-10">
                  {{ downpayments.percent }}%
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(
                      Math.ceil(downpayments.actualDownpayment)
                    ) || ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(
                      Math.ceil(downpayments.actualRepayment / 12)
                    ) || ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(Math.ceil(downpayments.actualRepayment)) ||
                    ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{ $formatCurrency(Math.ceil(downpayments.total)) || "" }}
                </td>
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
import AutoComplete from "@/components/Autocomplete/AutocompleteSearch.vue";
import calculate from "../utilities/calculator";
import { get, post } from "../utilities/api";
import ArrowUp from "../components/svgs/arrowup.vue"
export default {
  data() {
    return {
      registerBg2,
      apiUrls: {
        getProduct: `/api/inventory`,
        getCalculation: `/api/price_calculator`,
        businessTypes: `/api/business_type`,
        downPaymentRates: `/api/down_payment_rate`,
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
    };
  },
  components: {
    AutoComplete, 
    ArrowUp
  },
  computed: {
    computedGetCalc() {
      return this.downpaymentCalc();
    },
    toggleColor(){
      let color = '';
      if(this.selectedDownpayment == null){
        color = 'bg-gray-300 '
      } else if (this.selectedDownpayment.percent == 20){
         color = 'bg-blue-300'
      }else if (this.selectedDownpayment.percent == 40){
          color = 'bg-red-300'
      }else if (this.selectedDownpayment.percent == 60){
        color = 'bg-green-300'
      }else{
         color ='bg-yellow-300'
      }
      return  color 
    
    },
    toggletextColor(){
      let color = '';
      if(this.selectedDownpayment == null){
        color = 'text-gray-500'
      } else if (this.selectedDownpayment.percent == 20){
         color = 'text-blue-500'
      }else if (this.selectedDownpayment.percent == 40){
          color = 'text-red-500'
      }else if (this.selectedDownpayment.percent == 60){
        color = 'text-green-500'
      }else{
         color ='text-yellow-500'
      }
      return  color 
    
    },
    
  },
  async mounted() {
    await this.getCalculation();
    await this.getProduct();
    await this.getBusinessTypes();
    await this.getDownPaymentRates();
  },

  methods: {
    selectedItem(value) {
      this.selectedProduct = value;
      this.select_product = true
    },

    getResultMobile(bizId, percent) {
      this.selectedDownpayment = this.downpaymentCalculations.filter(
        (result) => {
          return result.bizId == bizId && result.percent == percent;
        }
      )[0];

    },

    downpaymentCalc() {
      let downPaymentArr = [];
      this.businessTypes.forEach((bizType) => {
         this.downPaymentRates.forEach((paymentRate) => {
          let filteredBizType = this.calculation.filter((param) => {
            return (
              bizType.id === param.business_type_id &&
              paymentRate.id === param.down_payment_rate_id 
            );
          });

          const { total, actualDownpayment, actualRepayment } = calculate(
            this.selectedProduct.price,
            paymentRate,
            filteredBizType[1]
          );

          downPaymentArr.push({
            bizId: bizType.id,
            percent: paymentRate["percent"],
            total,
            actualDownpayment,
            actualRepayment,
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
.alert{
  margin-bottom: 200%;
}
.d_buttons{
  width:3.7rem;
  height:3.7rem;
}
</style>