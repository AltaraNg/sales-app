<template>
  <div class="inactive-prospects overflow-x-auto">
    <div v-if="prospects.length > 0">
      <h1 class="text-2xl mt-3 mb-3 ml-4 text-center" style="color: #1F0812">
        Inactive Prospects
      </h1>

      <div class="md:flex md:justify-around">
        <div id="stats " class="chart">
          <pie-chart
            :chart-data="pieData"
            :options="option"
            v-if="loaded"
          ></pie-chart>
        </div>
        <div class="chart-label mx-0 ">
          <ul class="list-disc">
            <li
              v-for="(item, index) in dataSet"
              class="list-disc md:text-lg"
              :style="`color: ${color[index]}`"
            >
              <span class="text-left text-black">{{ labels[index] }}: </span
              ><span class="text-center font-bold text-black">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div class="hidden w-full overflow-x-auto mt-2 ml-2 md:contents">
          <table
            class="items-center w-full bg-transparent border-collapse mt-10"
          >
            <thead>
              <tr>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center"
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
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
                >
                  <div
                    class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
                  >
                    {{ index + OId || "" }}
                  </div>
                </td>

                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center custom-hover"
                  @click="selectUser(user)"
                >
                  {{ user.name || " " }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
                >
                  {{ user.customer_stage.name || " " | truncate(15) }}
                </td>

                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
                  :class="{
                    'text-red-500': user.last_prospect_activity === null,
                    'custom-hover': user.last_prospect_activity !== null
                  }"
                  @click="viewActivityList(user)"
                >
                  {{
                    user.last_prospect_activity
                      ? user.last_prospect_activity.text +
                        ` (${user.last_prospect_activity.type})`
                      : "No Activity" | truncate(35)
                  }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
                >
                  {{
                    user.last_prospect_activity
                      ? humanizeDate(user.last_prospect_activity.date)
                      : "N/A"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="contents md:hidden">
          <div class="pt-5">
            <h3 class="text-center text-lg mb-2 font-bold">
              List Of Inactive Prospects
            </h3>
          </div>
          <div :key="index" v-for="(user, index) in prospects">
            <div class="customerTile">
              <div class="flex justify-between text-xs">
                <div class="flex items-stretch">
                  <div
                    v-on:click="selectUser(user)"
                    :style="{ background: generateRandomColor() }"
                    class="avatarCircle"
                  >
                    {{ returnInitials(user.name) || "" }}
                  </div>
                  <div class="self-center font-medium">
                    <span class="text-sm capitalize">{{
                      user.name || ""
                    }}</span>
                    <div class="text-xs" @click="viewActivityList(user)">
                      {{
                        user.last_prospect_activity
                          ? user.last_prospect_activity.type
                          : "No Activity"
                      }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col my-auto">
                  <div class="font-bold">
                    {{
                      user.last_prospect_activity
                        ? humanizeDate(user.last_prospect_activity.date)
                        : "N/A"
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="prospects.length === 0 && $isProcessing === false">
      <zero-state
        :title="'No Inactive Prospects'"
        :message="'You currently have no inactive prospects'"
      >
        <template v-slot:image>
          <img src="../../assets/img/thumb-up.png" />
        </template>
      </zero-state>
    </div>

    <vue-tailwind-modal
      :showing="showActivityModal"
      @close="showActivityModal = false"
      :showClose="true"
      :backgroundClose="false"
      :css="modalOption"
    >
      <div class="mt-0 underline">
        <h3 class="p-2">Activities</h3>
      </div>
      <div class="w-full table  pl-2">
        <div class="table-header-group altaraBlue text-white p-2 text-sm mb-4">
          <div class="table-row font-bold p-2 m-2">
            <h3 class="table-cell p-3">S/N</h3>
            <h3 class="table-cell p-3">Activity Type</h3>
            <h3 class="table-cell p-3">Content</h3>
            <h3 class="table-cell p-3">Date</h3>
          </div>
        </div>
        <div class="table-row-group text-xs font-medium">
          <div
            v-for="(activity, index) in activityList"
            class="table-row"
            :style="
              index % 2 === 0
                ? { 'background-color': 'white' }
                : { 'background-color': '#F3F4F6' }
            "
          >
            <h5 class="table-cell p-2">{{ index + 1 }}</h5>
            <h5 class="table-cell p-2">{{ activity.type }}</h5>
            <h5 class="table-cell p-2">{{ activity.text }}</h5>
            <h5 class="table-cell p-2">{{ activity.date }}</h5>
          </div>
        </div>
      </div>
    </vue-tailwind-modal>
    <base-pagination
      :pageParam="pageParams"
      @fetchData="fetchInactiveProspects()"
      class="hidden md:contents"
    >
    </base-pagination>
  </div>
</template>

<script>
import moment from "moment";
import { get } from "../../utilities/api.js";
import PieChart from "../../components/charts/PieChart";
import VueTailwindModal from "vue-tailwind-modal";
import BasePagination from "../../components/BasePagination.vue";
import queryParam from "../../utilities/queryParam.js";
import ZeroState from "../../components/ZeroState.vue";
export default {
  components: { BasePagination, VueTailwindModal, PieChart, ZeroState },
  data() {
    return {
      headers: ["S/N", "Name", "Stage", "Last Activity", "Last Activity Date"],
      pageParams: {},
      apiUrls: {
        inactive_prospects: "/api/inactive/prospects",
        prospects_activities: "/api/prospect_activities"
      },
      loaded: false,
      labels: [],
      dataSet: [],
      prospects: [],
      totalInactive: 0,
      totalStages: "",
      option: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        }
      },
      color: [
        "#023e8a",
        "#CC5A71",
        "#22223b",
        "#55a630",
        "#973aa8",
        "#cb997e",
        "#ff0a54",
        "#43010e"
      ],
      OId: 0,
      pieData: {},
      showModal: false,
      showActivityModal: false,

      modalOption: {
        background: "smoke",
        modal: "max-h-90",
        close: "text-red"
      },
      activeUser: null,
      activityList: []
    };
  },
  async beforeMount() {
    await this.fetchInactiveProspects();
  },
  async mounted() {
    this.getNextList();
    await this.getProspectActivities();
    this.humanizeDate();
    this.loaded = true;
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
        this.totalStages = prospects.data?.data?.meta?.statsForStages;
        this.totalStages.sort((a, b) => {
          if (a.stage_name < b.stage_name) {
            return -1;
          }
          if (a.stage_name > b.stage_name) {
            return 1;
          }
          return 0;
        });
        this.getPieChartData();
        this.OId = from;
      } catch (err) {
        this.$displayErrorMessage(err);
      } finally {
        this.$LIPS(false);
      }
    },

    getPieChartData() {
      this.getPieData();
      this.pieData = {
        labels: this.labels,
        datasets: [
          {
            barPercentage: 1,
            barThickness: 12,
            maxBarThickness: 16,
            data: this.dataSet,
            backgroundColor: this.color
          }
        ]
      };
    },
    getPieData() {
      let arr = this.totalStages;
      let labels = [];
      let data = [];
      for (let item of arr) {
        labels.push(item["stage_name"]);
        data.push(item["stage_count"]);
      }
      this.labels = labels;
      this.dataSet = data;
    },
    selectUser(user) {
      this.$router.push(`/admin/userProfile/${user.id}`);
    },
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    async getProspectActivities() {
      let activities = await get(this.apiUrls.prospects_activities);
    },
    viewActivity(user) {
      this.activeUser = user;
      this.showModal = true;
    },

    async viewActivityList(user) {
      if (user.last_prospect_activity !== null) {
        this.$LIPS(true);
        try {
          let activities = await get(
            this.apiUrls.prospects_activities +
              queryParam({ customer: user.id })
          );
          this.activityList = activities.data.data.prospect_activities.data;
        } catch (error) {
          this.$displayErrorMessage(error);
        } finally {
          this.$LIPS(false);
        }
        this.showActivityModal = true;
      }
    },
    getNextList() {
      if (this.$mobileCheck()) {
        window.onscroll = () => {
          let bottomOfWindow =
            document.documentElement.scrollHeight -
              document.documentElement.scrollTop ===
            document.documentElement.clientHeight;
          if (bottomOfWindow) {
            this.pageParams.page += 1;
            const query = {
              ...this.searchQuery,
              page: this.pageParams.page,
              limit: this.pageParams.limit,
              inActiveDays: 30
            };

            get(this.apiUrls.inactive_prospects + queryParam(query)).then(
              res => {
                this.prospects = this.prospects.concat(
                  res?.data?.data?.prospects.data
                );
              }
            );
          }
        };
      }
    },
    humanizeDate(date) {
      return moment(date).fromNow();
    },
    returnInitials(name) {
      var names = name.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      } else {
        initials += names[0].substring(1, 2).toUpperCase();
      }
      return initials;
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
.chart,
.chart-label {
  width: 40vh;
  height: 50vh;
  margin: auto;
}
</style>
