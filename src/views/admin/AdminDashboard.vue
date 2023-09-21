<template>
  <div>
    <ul
      id="tabs"
      class="inline-flex w-full px-1 pt-2"
      v-if="canView === 'beta'"
    >
      <li
        class="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-blue-400 rounded-t opacity-50"
      >
        <a id="default-tab" href="#first">All</a>
      </li>
      <li class="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50">
        <a href="#second">View Stats</a>
      </li>
    </ul>
    <div id="tab-contents">
      <div id="first">
        <div class="flex flex-row">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded pr-2"
          >
            <show-room-stats :graphData="graphData"> </show-room-stats>
          </div>
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded pl-2"
          >
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-gray-800">
                    Feedbacks
                  </h3>
                </div>
                <div
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                ></div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <!-- Projects table -->

              <!-- Projects table -->
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Position
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Purchased
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Affidavit
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Registered
                    </th>

                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Contacted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      1
                    </th>
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      John Doe
                    </th>

                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      5
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      6
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      9
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      89
                    </td>
                  </tr>
                  <tr>
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      2
                    </th>
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      Jane Doe
                    </th>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      9
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      5
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      6
                    </td>

                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      89
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded pr-2"
          >
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-gray-800">
                    DSA Ratings
                  </h3>
                </div>
                <div
                  class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                ></div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <!-- Projects table -->

              <!-- Projects table -->
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Position
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Purchased
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Affidavit
                    </th>
                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Registered
                    </th>

                    <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    >
                      Contacted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in agents" :key="user.id">
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      {{ index + 1 }}
                    </th>
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                    >
                      {{ user.full_name }}
                    </th>

                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      {{ user.purchased }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      {{ user.affidavit }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      {{ user.registered }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                    >
                      {{ user.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="second" v-if="canView === 'beta'">
        <un-converted />
      </div>
    </div>
  </div>
</template>

<script>
  import ShowRoomStats from "../../components/ShowRoomStats.vue";
  import { get } from "../../utilities/api.js";
  import showroomData from "../../utilities/chartData.js";
  import queryParam from "../../utilities/queryParam";
  import UnConverted from "../../components/UnConverted.vue";

  export default {
    name: "AdminDashboard",
    components: {
      ShowRoomStats,
      UnConverted,
    },
    data() {
      return {
        apiUrls: {
          feedbacks: `/api/feedbacks`,
          getDSAs: `/api/get-users?role=18&stats=true`,
        },
        graphData: showroomData,
        pageParams: {},
        agents: [],
        searchQuery: {},
        canView: "",
      };
    },

    mounted() {
      this.getAgents();
      this.canView = localStorage.getItem("flag");
    },

    methods: {
      async getAgents() {
        this.$LIPS(true);
        try {
          const query = {
            ...this.searchQuery,
            page: this.pageParams.page,
            limit: this.pageParams.limit,
          };
          const agents = await get(this.apiUrls.getDSAs + queryParam(query));
          this.agents = agents.data.data.data;
          let {
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            per_page,
            next_page_url,
            to,
            total,
            prev_page_url,
          } = agents.data.data;
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
            prev_page_url,
          });
        } catch (err) {
          this.$displayErrorMessage(err);
        } finally {
          this.$LIPS(false);
        }
      },

      next(firstPage = null) {
        if (this.pageParams.next_page_url) {
          this.pageParams.page = firstPage
            ? firstPage
            : parseInt(this.pageParams.page) + 1;
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              page: this.pageParam.page,
            },
          });
          this.getAgents();
        }
      },

      previous(lastPage = null) {
        if (this.param.prev_page_url) {
          this.param.page = lastPage ? lastPage : parseInt(this.param.page) - 1;
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              page: this.param.page,
            },
          });
          this.getAgents();
        }
      },
    },
  };
</script>
