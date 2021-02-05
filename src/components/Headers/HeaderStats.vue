<template>
  <!-- Header -->
  <div class="relative altaraBlue md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                      Total Contacted
                    </h5>
                    <span class="font-semibold text-xl text-gray-800">
                      {{ totalContacted }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                    >
                      <i class="far fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                      Total Purchased
                    </h5>
                    <span class="font-semibold text-xl text-gray-800">
                      {{ totalPurchased }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
                    >
                      <i class="fas fa-chart-pie"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                      Total Affidavit
                    </h5>
                    <span class="font-semibold text-xl text-gray-800">
                      {{ totalAffidavit }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"
                    >
                      <i class="fas fa-users"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                      Total Registered On Portal
                    </h5>
                    <span class="font-semibold text-xl text-gray-800">
                      {{ totalRegistered }}
                    </span>
                  </div>
                  <div class="relative w-auto pl-4 flex-initial">
                    <div
                      class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500"
                    >
                      <i class="fas fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { get } from "../../utilities/api";
import { eventBus } from "../../main";

export default {
  components: {
    CardStats,
  },

  data() {
    return {
      totalContacted: 0,
      totalPurchased: 0,
      totalAffidavit: 0,
      totalRegistered: 0,
      usersList: [],
      employmentStatus: [],
      customerStage: [],
      apiUrls: {
        getEmploymentStatus: `/api/employment_status`,
        getusersList: `/api/customer_contact`,
        getStage: `/api/customer_stage`,
      },
    };
  },
  async created() {
    this.getCardValues();

    eventBus.$on("fireMethod", () => {
      this.getCardValues();
    });
  },
  methods: {
    async getCardValues() {
      this.totalAffidavit = await this.getCardValue("Affidavit");
      this.totalPurchased = await this.getCardValue("Purchased");
      this.totalContacted = await this.getCardValue("Contacted");
    },
    async getCardValue(query) {
      const userStages = await this.getUserStage();
      const usersList = await this.getUsersList();
      const data = usersList.filter(
        (x) =>
          x.customer_stage_id === userStages.find((y) => y.name === query).id
      ).length;
      return data;
    },
    async getEmploymentStatus() {
      try {
        const fetchEmploymentStatus = await get(
          this.apiUrls.getEmploymentStatus
        );
        return fetchEmploymentStatus.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getUserStage() {
      try {
        const fetchUserStage = await get(this.apiUrls.getStage);
        return fetchUserStage.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },

    async getUsersList() {
      try {
        const fetchusersList = await get(this.apiUrls.getusersList);
        this.totalRegistered = fetchusersList.data.data.data.length;
        return fetchusersList.data.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
  },
};
</script>
