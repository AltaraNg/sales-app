<template>
  <div>
    <div
      class="relative min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-3"
    >
       <div class="rounded-t bg-white mb-8 px-2 py-6 ">
      <div class="text-center flex justify-between">
        <h6 class="text-gray-800 text-xl font-bold">Feedbacks</h6>
      </div>
    </div>
      <div class="hidden md:contents">
        <div class="flex-col">
          <div class="flex">
            <div class="w-full lg:w-2/12 xl:w-2/12">
              <div class="relative w-50 mb-3 mr-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  From Date
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.fromDate"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-2/12">
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
                    v-model="searchQuery.toDate"
                  ></date-picker>
                </div>
              </div>
            </div>

            


             <div class="w-full lg:w-2/12 xl:w-2/12">
              <div class="relative w-50 mb-3 ">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2 px-3"
                  htmlFor="grid-password"
                >
                  Customer name
                </label>
                <div class="mx-input-wrapper px-3">
                  <input class="mx-input" v-model="searchQuery.customer"/>
                </div>
              </div>
            </div>

             <div
            v-on:click="getTodos()"
            class="w-full lg:w-1/12 xl:w-1/12 mt-6 altaraBlue text-white text-center rounded h-8 ml-36 cursor-pointer"
          >
            Search
          </div>
          <div
            v-on:click="resetSearch()"
            class="w-full lg:w-1/12 xl:w-1/12 mt-6 altaraBlue text-white text-center rounded h-8 ml-4 cursor-pointer"
          >
            Reset
          </div>
            <div            
            v-on:click="exportCsv()"
            class="w-full lg:w-1/12 xl:w-1/12 mt-6 altaraBlue text-white text-center rounded h-8 ml-4 cursor-pointer"
          >
          
            Export
          </div>
          </div>
        </div>

        

        <table class="items-center w-full bg-transparent border-collapse mt-5">
          <thead>
            <tr>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                S/N
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Customer
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Main Reason
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Side notes
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                DSA
              </th>

              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="pointer"
              :key="index"
              v-for="(feedback, index) in feedbacks"
              :style="
                index % 2 === 0
                  ? { 'background-color': 'white' }
                  : { 'background-color': '#F3F4F6' }
              "
            >
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                <div
                  class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
                >
                  {{   index + OId || "" }}
                </div>
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
              <!-- <router-link :to="{ name: 'userProfile', params: {customer: todo.customer, id: todo.customer.id } }"> 
                {{ todo.customer.name || "Not Available" }}
              </router-link> -->
              {{feedback.customer.name}}
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                {{ feedback.reason.reason || "" }}
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ feedback.notes || "" }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ feedback.user.full_name || "Not Available" }}
              </td>

              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                <!-- <input
                  @change="checkTodo(todo)"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-gray-600"
                  :checked="todo.status === 'done' ? true : false"
                /> -->
                {{feedback.created_at}}
              </td>
            </tr>
            <tr v-if="feedbacks.length === 0">
              <td colspan="6"  class="border-t-0 px-6 border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 justify-center flex ">
                You currently have no feedback
              </td>
            </tr>
          </tbody>
        </table>
         <div
        class="hidden md:contents relative min-w-0 bg-white w-full mb-6 shadow-lg rounded"
      >
        <base-pagination
          :pageParam="pageParams"
          @fetchData="getTodos()"
        />
      </div>
      </div>

      <div class="contents md:hidden">
        <div class="flex-col">
          <div class="flex flex-wrap">

            <div class="w-full lg:w-2/12 xl:w-3/12">
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
                    v-model="searchQuery.fromDate"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-3/12">
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
                    v-model="searchQuery.toDate"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-3/12">
              <div class="relative w-50 mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Todo Keyword
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.name"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-3/12">
              <div class="relative w-50 mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Customer Name
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.customer"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div
              v-on:click="getTodos()"
              class="w-1/5 py-2 altaraBlue rounded h-10 text-white text-center"
            >
              Search
            </div>
            <div
              v-on:click="resetSearch()"
              class="w-1/5 py-2 altaraBlue rounded h-10 text-white text-center"
            >
              Reset
            </div>
            <div
              v-on:click="exportCsv()"
              class="w-1/5 py-2 altaraBlue rounded h-10 text-white text-center"
            >
              Export
            </div>
           
          </div>
          <div :key="index" v-for="(data, index) in feedbacks" class="mt-5">
            <div class="customerTile">
              <div class="flex justify-between">
                <div class="flex items-stretch">
                  <div class="self-center font-medium">
                    {{ data.notes || "" }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="avatarCircle">
                    <input
                      @change="checkTodo(data)"
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-gray-600"
                      :checked="data.status === 'done' ? true : false"
                    />
                  </div>
                  <div class="text-xs">
                    {{ data.due_date || "Not Available" }}
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
import { get, put } from "../../utilities/api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import BasePagination from "../../components/BasePagination.vue";
import queryParam from "../../utilities/queryParam";
import feedbackApi from "../../api/feedback.js"
export default {
  components: {
    DatePicker,
    BasePagination
  },
  data() {
    return {
      feedbacks: [],     
      searchQuery: {},
      pageParams: {},
      OId: 0,
      canView: ''

    };
  },
  async created() {
    this.getTodos();
     this.canView = localStorage.getItem('flag');
  },
  methods: {
    async getTodos() {
      this.$LIPS(true);

      try {
        const query = {
          ...this.searchQuery,
           page: this.pageParams.page,
          limit: this.pageParams.limit,
        };
        
        const fetchFeedbacks = await feedbackApi.index(queryParam(query));
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
          prev_page_url,
        } = fetchFeedbacks.data.data;
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
        this.feedbacks = fetchFeedbacks.data.data.data;
        this.OId = from;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    
    resetSearch() {
      this.searchQuery = {};
      this.getTodos();

    },

    async exportCsv(){
      this.$LIPS(true);
      try {
        const response = await feedbackApi.exportFeedback();
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (error) {
        this.$displayErrorMessage(error);
      }finally{
        this.$LIPS(false);
      }

    },

  },
};
</script>

<style>
</style>