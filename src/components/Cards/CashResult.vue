<template>
  <div>
    <!-- mobile view -->
    <div>
      <div
        class="md:flex md:flex-col lg:hidden items-center w-full"
        v-for="repayment_duration in repaymentDuration"
        :key="repayment_duration.id"
      >
        <div
          class="
            rounded-lg
            flex flex-col
            md:px-8
            py-6
            px-1
            bg-white
            shadow-2xl
            h-auto
            w-11/12
            mx-auto
            mb-10
          "
        >
          <p class="text-xs mb-3 rounded py-2 text-white altaraBlue pl-3">
            Please click on a button below to select a downpayment
          </p>
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
                @click="getResultMobile(repayment_duration.id, dpayments.percent)"
                :class="toggleDownpaymentColor(dpayments)"
              >
                {{ dpayments.percent }}%
              </button>
            </div>
          </div>
          <p class="text-lg font-semibold px-5" :class="toggletextColor">
            {{ repayment_duration.name }}
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
                  downpaymentResult(
                    repayment_duration,
                    selectedDownpayment.actualDownpayment
                  )
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
                  downpaymentResult(
                    repayment_duration,
                    selectedDownpayment.biMonthlyRepayment
                  )
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
                  downpaymentResult(
                    repayment_duration,
                    selectedDownpayment.actualRepayment
                  )
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
                {{ downpaymentResult(repayment_duration, selectedDownpayment.total) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- desktop view -->
    <div
      class="hidden px-16 py-8 mb-8 bg-white rounded-lg lg:flex flex-col"
      v-for="(repaymentDuration, index) in repaymentDuration"
      :key="index"
    >
      <div>
        <p class="font-black text-2xl tracking-wid leading-3 mb-4">
          {{ repaymentDuration.name }}
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
          <tbody v-for="(downpayments, index) in computedGetCalc" :key="index">
            <tr
              class="my-2 px-3 py-2 flex justify-evenly items-center space-x-20"
              v-if="downpayments.re_duration == repaymentDuration.id"
              :class="toggleDownpaymentColor(downpayments)"
            >
              <td class="font-bold text-lg -mr-6 -ml-10">
                {{ downpayments.percent }}%
              </td>
              <td class="font-medium text-base">
                {{
                  $formatCurrency(downpayments.actualDownpayment)
                }}
              </td>
              <td class="font-medium text-base">
                {{
                  $formatCurrency(downpayments.biMonthlyRepayment)
                }}
              </td>
              <td class="font-medium text-base">
                {{
                  $formatCurrency(downpayments.actualRepayment)
                }}
              </td>
              <td class="font-medium text-base">
                {{
                   $formatCurrency(downpayments.total)
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Result from '../../Mixins/result.js'
export default {
  mixins:[Result],
  props: {
    repaymentDuration: {
      type: Array,
      required: true,
    },
  },
  methods: {
    downpaymentResult(repayment_duration, result) {
      if (repayment_duration.id == this.selectedDownpayment?.re_duration){
        return "₦" + result.toFixed(2);
      } 
      return "₦0.00";

    },
   
  },
};
</script>

<style scoped>
.d_buttons {
  width: 3.7rem;
  height: 3.7rem;
}
</style>