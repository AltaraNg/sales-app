<template>
  <div>
      <!-- mobile view -->
      <div>
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
              py-6
              px-3
              bg-white
              shadow-2xl
              h-auto
              w-11/12
              md:w-11/12
              mx-auto
              mb-10
            "
          >
          <p class="text-xs mb-3 rounded py-2 text-white altaraBlue pl-3">Please click on a button below to select a downpayment</p>
            <div class="flex justify-center md:space-x-20 justify-evenly mb-4">
              <div v-for="dpayments in downPaymentRates" :key="dpayments.id">
             <button
                  class="
                    rounded-full
                    d_buttons
                    font-semibold
                    text-white text-lg
                    cursor-pointer
                    transform
                    hover:scale-125
                    bg-gray-500
                    focus:outline-none
                  "
                  @click="getResultMobile(biztype.id, dpayments.percent)"
                  :class=" toggleDownpaymentColor(dpayments)"
                >
                  {{ dpayments.percent }}%
                </button>
              </div>
            </div>
            <p class="text-lg font-semibold" :class="toggletextColor">
              {{ biztype.name }}
            </p>
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
                  :class="toggleColor"
                >
                  Initial Payment
                </div>
                <p class="amount font-bold text-lg text-center">
                  {{
                    downpaymentResult(biztype, selectedDownpayment.actualDownpayment )
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
                    downpaymentResult(biztype, selectedDownpayment.biMonthlyRepayment )
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
                    downpaymentResult(biztype, selectedDownpayment.actualRepayment )
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
                    downpaymentResult(biztype, selectedDownpayment.total )
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
                toggleDownpaymentColor(downpayments)
                "
              >
                <td class="font-bold text-lg -mr-6 -ml-10">
                  {{ downpayments.percent }}%
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(
                      Math.floor(downpayments.actualDownpayment)
                    ) || ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(
                      Math.floor(downpayments.biMonthlyRepayment)
                    ) || ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{
                    $formatCurrency(Math.floor(downpayments.actualRepayment)) ||
                    ""
                  }}
                </td>
                <td class="font-medium text-base">
                  {{ $formatCurrency(Math.floor(downpayments.total)) || "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
 </div>           
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.name
        }
    },
    computed:{      
         toggleColor() {
      let color = "";
      let selectDownpayment = !this.selectedDownpayment
        ? null
        : this.selectedDownpayment.percent;
      switch (selectDownpayment) {
        case 20:
          color = "bg-blue-300";
          break;
        case 40:
          color = "bg-red-300 ";
          break;
        case 60:
          color = "bg-green-300 ";
          break;
        case 80:
          color = "bg-yellow-300 ";
          break;
        default:
          color = "bg-gray-400 ";
      }
      return color;
    },
    toggletextColor() {
      let color = "";
      let selectDownpayment = !this.selectedDownpayment
        ? null
        : this.selectedDownpayment.percent;
      switch (selectDownpayment) {
        case 20:
          color = "text-blue-500";
          break;
        case 40:
          color = "text-red-500 ";
          break;
        case 60:
          color = "text-green-500 ";
          break;
        case 80:
          color = "text-yellow-500 ";
          break;
        default:
          color = "text-gray-400 ";
      }
      return color;
    },
    },
    props:{
        businessTypes:{
            type: Array,
            required: true
        },
        downPaymentRates:{
            type: Array,
            required: true
        },
        getResultMobile:{
            type:Function,
            required:true
        },
        selectedDownpayment:{
            type:null,
            function:true
        },
        computedGetCalc:{
            type: Array,
            required: true
        }


    },
    methods:{
         downpaymentResult(biztype, result){
          if(this.selectedDownpayment !== null && biztype.id == this.selectedDownpayment.bizId){
            return '₦'+ result.toFixed(2)
          }else{
            return "₦0.00"
          }
                        
      },
       toggleDownpaymentColor(downpayments){
            let color = "";
               let selectDownpayment = !downpayments ? null : downpayments.percent;
         switch (selectDownpayment) {
        case 20:
          color = "lg:bg-blue-100 bg-blue-500";
          break;
        case 40:
          color = "lg:bg-red-100 bg-red-500";
          break;
        case 60:
          color = "lg:bg-green-100 bg-green-500";
          break;
        case 80:
          color = "lg:bg-yellow-100 bg-yellow-500";
          break;
        default:
          color = "lg:bg-gray-100 bg-gray-500";
      }
      return color; 
        },

    }

}
</script>

<style scoped>
.d_buttons {
  width: 3.7rem;
  height: 3.7rem;
}
</style>