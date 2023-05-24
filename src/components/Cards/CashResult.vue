<template>
  <div>
    <!-- mobile view -->
    <div>
      <template v-for="(repayment_duration, index) in AvailableDuration">
        <div
          class="md:flex md:flex-col lg:hidden items-center w-full"
       
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
            <div class="flex justify-center md:space-x-20 space-x-6 mb-4">
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
                  @click="
                    getResultMobile(repayment_duration.id, dpayments.percent)
                  "
                  :class="toggleDownpaymentColor(dpayments)"
                  v-if="
                    showMobileButton(repayment_duration.id, dpayments.percent)
                  "
                >
                  {{ dpayments.percent }}%
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-lg font-semibold px-5" :class="toggletextColor">
                {{ repayment_duration.name }}
              </p>
              <div class="flex w-1/5 " @click="ToggleFixedRepaymentMobile">
                <div
                  class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
                  :class="{ 'bg-green-600': mobileFixedRepayment }"
                >
                  <div
                    class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
                    :class="{ 'translate-x-4': mobileFixedRepayment }"
                  ></div>
                </div>
              </div>
            </div>

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
                  {{
                    downpaymentResult(
                      repayment_duration,
                      selectedDownpayment.total
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <vue-tailwind-modal
            :showing="showModal"
            @close="showModal = false"
            :showClose="true"
            :backgroundClose="true"
            :css="modalOptions"
          >
            <div class="flex flex-wrap lg:hidden w-11/12 space-y-2">
              <div
                v-for="(amortization, index) in Ammortization"
                :key="index + 'mobile'"
                class="rounded-lg bg-white p-3 flex w-1/2 md:w-1/3 flex items-center shadow-lg"
              >
                <div
                  class="items-center flex flex-col justify-center w-full text-center text-gray-800"
                >
                  <p>
                    {{
                      new Date(
                        amortization.expected_payment_date
                      ).toLocaleDateString()
                    }}
                  </p>
                  <p class="font-bold">
                    {{ $formatCurrency(amortization.expected_amount) }}
                  </p>
                </div>

                <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
              </div>
            </div>
          </vue-tailwind-modal>
        </div>
      </template>
    </div>
    <!-- desktop view -->
    <template v-for="(repaymentDuration, index) in repaymentDuration">
      <div
        class="hidden px-12 py-8  mb-8 bg-white rounded-lg lg:flex flex-col"
        v-if="
          (repaymentDuration.name == 'nine_months' && isRent()) ||
            !(
              repaymentDuration.name == 'nine_months' ||
              isRent() ||
              (isSuperLoan() && repaymentDuration.name == 'six_months') ||
              !(isSuperLoan() || repaymentDuration.name == 'six_months')
            )
        "
        :key="index"
      >
        <div>
          <p class="font-black text-2xl tracking-wide leading-3 mb-4">
            {{ repaymentDuration.name }}
          </p>
          <table class="flex flex-col justify-center items-evenly">
            <thead class="my-2  pt-4 flex  items-center space-x-1">
              <td class="w-1/12"></td>
              <td class="font-bold text-lg w-1/6">Initial Payment</td>
              <td class="font-bold text-lg w-1/5">Bi-Monthly Repayment</td>
              <td class="font-bold text-lg w-1/5">Total Repayment</td>
              <td class="font-bold text-lg w-1/5">Total Product Price</td>
              <td class="font-bold text-lg w-1/5">Fixed Repayment</td>
            </thead>
            <tbody
              v-for="(downpayments, index) in computedGetCalc"
              :key="index"
            >
              <tr
                class="
                  my-2
                  py-2
                  flex 
                  items-center
                  cursor-pointer
                "
                @click="PreviewAmmortizationDesktop(downpayments)"
                v-if="
                  downpayments.re_duration == repaymentDuration.id &&
                    downpayments.actualDownpayment > 0
                "
                :class="toggleDownpaymentColor(downpayments)"
              >
                <td class="font-bold text-lg w-1/12">
                  {{ downpayments.percent }}%
                </td>
                <td class="font-medium text-base w-1/6">
                  {{ $formatCurrency(downpayments.actualDownpayment) }}
                </td>
                <td class="font-medium text-base w-1/5">
                  {{ $formatCurrency(downpayments.biMonthlyRepayment) }}
                </td>
                <td class="font-medium text-base w-1/5">
                  {{ $formatCurrency(downpayments.actualRepayment) }}
                </td>
                <td class="font-medium text-base w-1/5">
                  {{ $formatCurrency(downpayments.total) }}
                </td>

                <div
                  class="flex w-1/5 "
                  @click="ToggleFixedRepayment(downpayments)"
                >
                  <div
                    class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
                    :class="{ 'bg-green-600': downpayments.FixedRepayment }"
                  >
                    <div
                      class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
                      :class="{ 'translate-x-4': downpayments.FixedRepayment }"
                    ></div>
                  </div>
                </div>
              </tr>
              <div class="">
                <vue-tailwind-modal
                  :showing="showModal"
                  @close="showModal = false"
                  :showClose="true"
                  :backgroundClose="true"
                  :css="modalOptions"
                >
                  <div class="block  space-y-10">
                    <p
                      class="text-lg mb-1 font-semibold mt-2 text-gray-800 capitalize"
                    >
                      Repayments:
                    </p>
                    <TableVue
                      class="hidden pr-4 mb-8 lg:block w-full overflow-hidden"
                    >
                      <template #columns>
                        <th
                          scope="col"
                          class="px-5 py-4 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-left text-sm font-semibold text-gray-900"
                          v-for="(amortization, index) in Ammortization"
                          :key="index + 'date'"
                        >
                          {{
                            new Date(
                              amortization.expected_payment_date
                            ).toLocaleDateString()
                          }}
                        </th>
                      </template>
                      <template #default>
                        <tr>
                          <td
                            class="whitespace-nowrap font-semibold px-5 py-4 text-sm text-gray-900"
                          >
                            Amount
                          </td>
                          <td
                            class="whitespace-nowrap font-semibold px-4 py-4 text-sm text-gray-900"
                            v-for="(amortization, index) in Ammortization"
                            :key="index + 'amount'"
                          >
                            {{ $formatCurrency(amortization.expected_amount) }}
                          </td>
                        </tr>
                      </template>
                    </TableVue>
                  </div>
                  <!-- Put your modal content here -->
                </vue-tailwind-modal>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Result from "../../Mixins/result.js";
import VueTailwindModal from "vue-tailwind-modal";
import { post } from "../../utilities/api";
import TableVue from "../Table.vue";
export default {
  mixins: [Result],
  components: {
    VueTailwindModal,
    TableVue,
  },
  data() {
    return {
      AvailableDuration:[],
      modalOptions: {
        background: "bg-smoke-200",
        modal:
          "lg:max-w-6xl lg:max-h-10/12 max-h-11/12 bg-white  overflow-hidden",
        close: "text-red-500 text-4xl  font-bold",
      },
      showModal: false,
      apiUrls: {
        preview: `api/amortization/preview`,
      },
      Ammortization: [],
      mobileFixedRepayment: true,
    };
  },

  props: {
    repaymentDuration: {
      type: Array,
      required: true,
    },
    businessTypes: {
      type: Array,
    },
    downpaymentCalculations: {
      type: Array,
    },
    selectedDownpayment: {},
  },
  methods: {
    async PreviewAmmortization(downpayments, fixed_repayment) {
      try {
        const previewAmmortization = await post(this.apiUrls.preview, {
          bank_id: 1,
          branch_id: "12",
          business_type_id: downpayments.businessType,
          commitment_amount: 0,
          commitment_percentage: 0,
          customer_id: 3,
          down_payment: downpayments.actualDownpayment,
          down_payment_rate_id: downpayments.down_payment_rate_id,
          financed_by: "altara",
          fixed_repayment: fixed_repayment,
          inventory_id: 53259,
          owner_id: 601,
          payment_method_id: 1,
          payment_type_id: 2,
          product_price: downpayments.total,
          repayment: downpayments.actualRepayment,
          repayment_cycle_id: 1,
          repayment_duration_id: downpayments.re_duration,
          sales_category_id: 1,
        });
        this.Ammortization = previewAmmortization.data.data;
        this.showModal = true;
      } catch (err) {
        this.$displayErrorMessage(err);
      }

      console.log(downpayments);
    },
    async PreviewAmmortizationDesktop(downpayments) {
      await this.PreviewAmmortization(
        downpayments,
        downpayments.FixedRepayment
      );
    },
    async PreviewAmmortizationMobile() {
      if (this.selectedDownpayment) {
        await this.PreviewAmmortization(
          this.selectedDownpayment,
          this.mobileFixedRepayment
        );
      }
    },
    ToggleFixedRepayment(downpayment) {
      downpayment.FixedRepayment = !downpayment.FixedRepayment;
    },
    ToggleFixedRepaymentMobile() {
      this.mobileFixedRepayment = !this.mobileFixedRepayment;
      this.PreviewAmmortizationMobile();
    },
    downpaymentResult(repayment_duration, result) {
      if (repayment_duration.id == this.selectedDownpayment?.re_duration) {
        return "₦" + result.toFixed(2);
      }
      return "₦0.00";
    },
    isRent() {
      return (
        this.businessTypes.find((item) => item.slug == "ap_rentals")?.slug ==
          this.$route.params.slug ||
        this.$route.params.slug.includes("ap_starter_cash_nine_months")
      );
    },

    isSuperLoan() {
      return this.$route.params.slug.includes("ap_super");
    },
    showMobileButton(repayduration, percent) {
      return (
        this.downpaymentCalculations?.find((result) => {
          return (
            result.re_duration == repayduration && result.percent == percent
          );
        })?.total > 0
      );
    },
    showAvailableDuration() {
   this.AvailableDuration =  this.repaymentDuration.filter((obj1) =>
        this.downpaymentCalculations.some(
          (obj2) => obj1.id == obj2?.re_duration && obj2?.actualDownpayment > 0
        )
      );
    },
   
  },
   watch:{
      downpaymentCalculations(){  
        this.showAvailableDuration()
    },
  },
}
</script>

<style scoped>
.d_buttons {
  width: 3.7rem;
  height: 3.7rem;
}
</style>
