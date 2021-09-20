<template>
  <div class="inactive-prospects">
    <h1 class="text-2xl mt-3 mb-10 ml-4">Inactive Prospects</h1>

    <div class="card-area">
      <div
        class="relative w-full pr-4 max-w-full flex-grow flex-1 card text-center mx-2"
      >
        <h5 class="text-gray-500 uppercase font-bold text-xs">
          Total
        </h5>
        <span class="font-semibold text-xl text-gray-800">
          {{ totalInactive }}
        </span>
      </div>
      <div
        class="relative w-full pr-4 max-w-full flex-grow flex-1 card text-center mx-2"
      >
        <h5 class="text-gray-500 uppercase font-bold text-xs">
          Affidavit
        </h5>
        <span class="font-semibold text-xl text-gray-800">
          25
        </span>
      </div>
      <div
        class="relative w-full pr-4 max-w-full flex-grow flex-1 card text-center mx-2"
      >
        <h5 class="text-gray-500 uppercase font-bold text-xs">
          KYC
        </h5>
        <span class="font-semibold text-xl text-gray-800">
          25
        </span>
      </div>
    </div>
    <div
      class="block w-full overflow-x-auto mt-10 ml-2"
      v-if="prospects.length > 0"
    >
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              v-for="header in headers"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="pointer"
            :key="index"
            v-for="(user, index) in prospects"
            :style="
              index % 2 === 0
                ? { 'background-color': 'white' }
                : { 'background-color': '#F3F4F6' }
            "
          >
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
            >
              <div
                class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
              >
                {{ index + OId || "" }}
              </div>
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left custom-hover"
              @click="selectUser(user)"
            >
              {{ user.name || " " }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
            >
              {{ user.customer_stage.name || " " }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              :class="{ 'text-red-500': user.last_prospect_activity === null, 'custom-hover': user.last_prospect_activity !== null }" @click="viewActivity(user)"
            >
              {{
                user.last_prospect_activity
                  ? user.last_prospect_activity.type
                  : "No Activity"
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="chatBox mt-4 w-48">
      You are up to date
    </div>

    <vue-tailwind-modal
      :showing="showModal"
      @close="showModal = false"
      :showClose="true"
      :backgroundClose="false"
      :css="modalOptions"
    >
    <div v-if="activeUser && activeUser.last_prospect_activity !== null">
    <p>Activity type: <span>{{activeUser ? activeUser.last_prospect_activity.type : ''}}</span></p>
    <p>Details: <span>{{activeUser ? activeUser.last_prospect_activity.text : ''}}</span></p>
    <p>Date occurred: <span>{{activeUser ? activeUser.last_prospect_activity.created_at : ''}}</span></p>
    </div>
    <div v-else>
      <p class="text-lg"> There is no Activity</p>
    </div>
    </vue-tailwind-modal>
    <base-pagination
      :pageParam="pageParams"
      @fetchData="fetchInactiveProspects()"
    >
    </base-pagination>
  </div>
</template>

<script>
import { get } from "../../utilities/api.js";
import VueTailwindModal from "vue-tailwind-modal";
import BasePagination from "../../components/BasePagination.vue";
import queryParam from "../../utilities/queryParam.js";
export default {
  components: { BasePagination, VueTailwindModal },
  data() {
    return {
      headers: ["S/N", "Name", "Stage", "Last Activity"],
      pageParams: {},
      apiUrls: {
        inactive_prospects: "/api/inactive/prospects"
      },
      prospects: "",
      totalInactive: 0,
      OId: 0,
      showModal: false,
      modalOptions: {},
      activeUser: null
    };
  },
  mounted() {
    this.fetchInactiveProspects();
  },
  methods: {
    async fetchInactiveProspects() {
      try {
        const query = {
          ...this.searchQuery,
          page: this.pageParams.page,
          limit: this.pageParams.limit,
          inActiveDays: 30
        };
        this.$LIPS(true);
        let prospects = await get(
          this.apiUrls.inactive_prospects + queryParam(query)
        );

        let {
          current_page,
          first_page_url,
          from,
          last_page,
          last_page_url,
          data,
          per_page,
          next_page_url,
          to,
          total,
          prev_page_url
        } = prospects.data?.data?.prospects;
        this.pageParams = Object.assign({}, this.pageParams, {
          current_page,
          first_page_url,
          from,
          last_page,
          last_page_url,
          per_page,
          next_page_url,
          to,
          total,
          prev_page_url
        });
        this.prospects = data;
        this.totalInactive = prospects.data?.data?.meta?.total;
        this.OId = from;
      } catch (err) {
        this.$displayErrorMessage(err);
      } finally {
        this.$LIPS(false);
      }
    },
    selectUser(user) {
      this.$router.push(`/admin/userProfile/${user.id}`);
    },
    viewActivity(user){
      this.activeUser = user;
      this.showModal = true;
    }
  }
};
</script>

<style lang="css" scoped>
.card-area {
  display: flex;
  align-content: center;
  margin-left: 5%;
}
.inactive-prospects {
  margin-top: 5%;
}
.card {
  box-shadow: 1px;
  border: 1px #094a73 solid;
}
.custom-hover:hover {
  text-decoration: underline;
  font-weight: bold;
}
</style>
