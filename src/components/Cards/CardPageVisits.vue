<template>
  <div>
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-3"
    >
      <div class="flex justify-between">
        <div class="mr-10">
          <div class="relative w-50 mb-3">
            <label
              class="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Employment Status
            </label>
            <select
              v-model="searchQuery.employment_status_id"
              name="employment status"
              class="mx-input"
            >
              <option disabled selected="selected">
                Select Employment Status
              </option>
              <option
                :value="type.id"
                :key="type.id"
                v-for="type in employmentStatus"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="">
          <div class="relative w-50 mb-3">
            <label
              class="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Customer Stage
            </label>
            <select v-model="searchQuery.stage" class="mx-input">
              <option disabled selected="selected">
                Select Customer Stage
              </option>
              <option
                :value="type.id"
                :key="type.id"
                v-for="type in customerStage"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="">
          <div class="relative w-50 mb-3">
            <label
              class="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              From Date
            </label>
            <div>
              <date-picker
                valueType="format"
                v-model="searchQuery.startDate"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="">
          <div class="relative w-50 mb-3">
            <label
              class="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              To Date
            </label>
            <div>
              <date-picker
                valueType="format"
                v-model="searchQuery.endDate"
              ></date-picker>
            </div>
          </div>
        </div>
        <button
          v-on:click="searchUsersList()"
          class="altaraBlue rounded h-10 mt-6 px-3 text-white"
        >
          Search
        </button>
        <button
          v-on:click="resetSearch()"
          class="altaraBlue rounded h-10 mt-6 px-3 text-white"
        >
          Reset
        </button>
      </div>
    </div>

    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-gray-800">
              {{
                usersList.length != 0
                  ? "List of contacted customers"
                  : "You have no Registered Customer"
              }}
            </h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
          ></div>
        </div>
      </div>
      <div v-if="usersList.length != 0" class="block w-full overflow-x-auto">
        <!-- Projects table -->

        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                S/N
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Name
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Reg ID
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                phone
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                email
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Monthly Income
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Employment Status
              </th>
              <th
                class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Customer Stage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(user, index) in usersList">
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                {{ index + 1 }}
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                {{ user.name }}
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                {{ user.reg_id }}
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ user.phone }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ user.email }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ $formatCurrency(user.monthly_income) }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{
                  employmentStatus.find(
                    (x) => x.id === user.employment_status_id
                  ).name
                }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{
                  customerStage.find((x) => x.id === user.customer_stage_id)
                    .name
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
import { get } from "../../utilities/api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import queryParam from "../../utilities/queryParam";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      searchQuery: {},
      searchFilter: {},
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
    await this.getEmploymentStatus();
    await this.getUserStage();
    await this.getUsersList();
  },
  methods: {
    async getEmploymentStatus() {
      try {
        const fetchEmploymentStatus = await get(
          this.apiUrls.getEmploymentStatus
        );
        this.employmentStatus = fetchEmploymentStatus.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getUserStage() {
      try {
        const fetchUserStage = await get(this.apiUrls.getStage);
        this.customerStage = fetchUserStage.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },

    async getUsersList() {
      this.$LIPS(true);

      try {
        const fetchusersList = await get(this.apiUrls.getusersList);
        this.usersList = fetchusersList.data.data.data;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    resetSearch() {
      this.searchQuery = {};
    },
    async searchUsersList() {
      this.$LIPS(true);

      try {
        const fetchusersList = await get(
          this.apiUrls.getusersList + queryParam(this.searchQuery)
        );
        this.usersList = fetchusersList.data.data.data;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style >
.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
</style>