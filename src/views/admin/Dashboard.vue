<template>
  <div>
    <div>
      <div
        class="relative min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-3"
      >
        <div class="hidden md:contents">
          <div class="mb-2">
            <auto-complete :url="'/api/customer_contact'" :title="'Search User'" />
          </div>
          <div class="flex flex-row mb-3 w-full">
              <div class="flex-1">
                <div class="p-1">
                  <label
                    class="block uppercase text-gray-700 text-sm font-bold mb-2 sm:text-xs overflow-auto"
                    htmlFor="grid-password"
                  >
                    Employment Status
                  </label>
                  <select
                    v-model="searchQuery.employmentStatus"
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
                      {{ type.name || "" }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex-1">
                <div class="p-1">
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
                      {{ type.name || "" }}
                    </option>
                  </select>
                </div>
              </div>

              <div
                class="p-1 flex-1"
                v-if="canDo(Manager) || canDo(Coordinator)"
              >
                <div class="relative mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Branch
                  </label>
                  <select v-model="searchQuery.branch" class="mx-input">
                    <option disabled selected="selected">Select Branch</option>
                    <option
                      :value="type.id"
                      :key="type.id"
                      v-for="type in branches"
                    >
                      {{ type.name || "" }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex-1 p-1" v-if="!canDo(DSA)">
                <div class="relative mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    DSA
                  </label>
                  <select v-model="searchQuery.dsa" class="mx-input">
                    <option disabled selected="selected">Select DSA</option>
                    <option
                      :value="type.id"
                      :key="type.id"
                      v-for="type in agents"
                    >
                      {{ type.full_name || "" }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex-1 p-1">
                <div class="relative mb-3">
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
              <div class="flex-1 p-1">
                <div class="relative mb-3">
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
            </div>
          
        </div>

        <div class="contents md:hidden">
          <div class="flex-col">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-2/12 xl:w-3/12">

              <div class="relative w-50 mb-3">
                <auto-complete :url="'/api/customer_contact'" :title="'Search User'" />

              </div>
                <div class="relative w-50 mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Employment Status
                  </label>
                  <select
                    v-model="searchQuery.employmentStatus"
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
                      {{ type.name || "" }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-2/12 xl:w-3/12">
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
                      {{ type.name || "" }}
                    </option>
                  </select>
                </div>
              </div>
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
                      v-model="searchQuery.startDate"
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
                      v-model="searchQuery.endDate"
                    ></date-picker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div class="flex justify-between">
          <div
            v-on:click="searchUsersList()"
            class="w-1/6 py-2 altaraBlue rounded h-10 text-white text-center cursor-pointer"
          >
            <i class="fas fa-search"></i>
            <span class="mx-1 hidden md:contents">Search</span>
            
          </div>
          <div
            v-on:click="resetSearch()"
            class="w-1/6 py-2 altaraBlue rounded h-10 text-white text-center cursor-pointer"
          >
          <i class="fas fa-recycle"></i>
            <span class="mx-1 hidden md:contents">Reset</span>
            
          </div>

          <div
            v-on:click="exportCsv()"
            class="w-1/6 py-2 altaraBlue rounded h-10 text-white text-center cursor-pointer"
          >
            <i class="fas fa-file-export"></i>
            <span class="mx-1 hidden md:contents">Export</span>
            
          </div>
        </div>
      </div>

      <vue-tailwind-modal
          :showing="showModal"
          @close="showModal = false"
          :showClose="true"
          :backgroundClose="false"
          :css="modalOptions"
        >
          <!-- Put your modal content here -->
        <h1 class="text-center text-lg">
          <i class="fas fa-exclamation-triangle text-yellow-600 "></i>
        </h1>
          <h2 class="text-lg mb-5 text-center">
             Inactive Prospects Notification </h2>
          <p class="text-lg">You have {{getInactiveProspects}} inactive customers who have not moved stages in a long time. <router-link class="text-blue-500 float-right" to="/admin/inactive-prospects">Click here to view them</router-link></p>
        </vue-tailwind-modal>

      <div class="contents md:hidden relative">
        <div class="text-center py-2 font-medium px-5">
          List of contacted customer
        </div>
        <div v-if="usersList.length > 0">
          <div :key="index" v-for="(user, index) in usersList">
            <div v-on:click="viewUser(user)" class="customerTile">
              <div class="flex justify-between text-xs">
                <div class="flex items-stretch ">
                  <div
                    :style="{ background: generateRandomColor() }"
                    class="avatarCircle"
                  >
                    {{ user.name[0].toUpperCase() || "" }}
                  </div>
                  <div class="self-center font-medium">
                    {{ user.name || "" }}
                  </div>
                </div>
                <div class="flex flex-col my-auto">
                  <div class="font-bold">{{ user.reg_id || "" }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden md:contents relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-gray-800">
                {{
                  usersList.length != 0
                    ? "List of contacted customers"
                    : "You have no Registered Customer" || ""
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
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  S/N
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Name
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Reg ID
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  phone
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  email
                </th>

                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Employment Status
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Customer Stage
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Contacted By
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Date Registered
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="pointer"
                v-on:click="viewUser(user)"
                :key="index"
                v-for="(user, index) in usersList"
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
                    {{ index + OId || "" }}
                  </div>
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  {{ user.name || "" }}
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  {{ user.reg_id || "" }}
                </th>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.phone || "" }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.email || "" }}
                </td>

                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.employment_status.name || "" }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.customer_stage.name || "" }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.users.full_name || "" }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ $dateTimeConvert(user.created_at) || "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="hidden md:hidden relative min-w-0 bg-white w-full mb-6 shadow-lg rounded"
      >
        <base-pagination
          :pageParam="pageParams"
          @fetchData="searchUsersList()"
        />
      </div>
      <div v-if="feedbackModal" id="overlay">
        <div class="flex items-center justify-center bottom-0 w-full h-full">
          <div class="bg-white rounded-lg md:ml-56 py-4 md:h-full xl:h-500-px">
            <div class="relative w-full px-4 max-w-full flex justify-between">
              <h3 class="font-semibold text-base text-gray-800">
                {{ customer.name || "" }} - Feedbacks
              </h3>
              <i class="fas fa-times-circle" v-on:click="closeModal()"></i>
            </div>
            <br />
            <div class="flex flex-wrap">
              <div class="w-full md:w-6/12 px-4">
                <textarea
                  rows="8"
                  cols="35"
                  type="text"
                  name="feedback"
                  placeholder="Enter Feedback..."
                  v-validate="'required'"
                  :class="[
                    errors.first('feedback') || error.feedback
                      ? 'is-invalid'
                      : 'border'
                  ]"
                  v-model="customer.feedback"
                />
                <br />
                <small class="error-control" v-if="errors.first('feedback')">
                  {{ errors.first("feedback") }}
                </small>
                <small class="error-control" v-if="error.feedback">{{
                  error.feedback[0]
                }}</small>
                <br /><br />
                <button
                  v-on:click="postFeedbackComment(customer)"
                  class="altaraBlue rounded h-10 mt-6 px-3 text-white"
                >
                  Log Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="feedbackPopup" id="overlay">
        <div class="flex items-center justify-center bottom-0 w-full h-full">
          <div class="bg-white rounded-lg md:ml-56 m-16 py-4 w-6/12 h-350-px">
            <div class="relative w-full px-4 max-w-full flex justify-between">
              <h3 class="font-semibold text-base text-gray-800">
                {{ customer.name || "" }} - Feedbacks
              </h3>
              <i class="fas fa-times-circle" v-on:click="closePopup()"></i>
            </div>
            <br />
            <div class="px-4 h-290-px overflow-x-auto">
              {{ message || "" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplete from '../../components/AutoCompleteSearch.vue'
import {mapGetters} from 'vuex';
import { get, post } from "../../utilities/api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import queryParam from "../../utilities/queryParam";
import { eventBus } from "../../main";
import permissions from "../../components/mixins/permissions.js";
import BasePagination from "../../components/BasePagination";
import customerApi from "../../api/customer.js";
import router from "../../router";
import VueTailwindModal from "vue-tailwind-modal";
import Vue from "vue";

export default {
  mixins: [permissions],
  components: {
    DatePicker,
    BasePagination,
    VueTailwindModal,
    AutoComplete
  },

  props: {
    size: {
      type: Number,
      required: false,
      default: 20
    }
  },

  computed: {
    ...mapGetters(['getInactiveProspects'])
  },
  
  
  data() {
    return {
      modalOptions: {
	background: "smoke",
	modal: "max-h-90",
	close: "text-red",
},
      pageNumber: 1,
      pageParams: {},
      OId: 0,
      searchQuery: {},
      searchFilter: {},
      usersList: [],
      employmentStatus: [],
      customerStage: [],
      comments: [],
      branches: [],
      agents: [],
      message: "",
      showModal: false,
      page: 1,
      apiUrls: {
        postComment: `/api/feedback`,
        getDSAs: `/api/get-users?role=18`,
        customerContact: '/api/customer_contact'
      },
      userMeta: {},
      feedback: "",
      customer: {},
      feedbackModal: false,
      feedbackPopup: false,
      error: {},
      canView: "",
      username : localStorage.getItem('user_name')
    };
  },
  beforeMount(){
    this.searchUsersList();
  },

  async mounted() {
    this.showNotification();
    await this.getBranches();
    await this.getAgents();
    await this.getUserStage();
    await this.getEmploymentStatus();
    
    this.canView = localStorage.getItem("flag");
    this.getNextList();

    
  },
  methods: {
    async getEmploymentStatus() {
      try {
        const fetchEmploymentStatus = await customerApi.employmentStatus();
        this.employmentStatus = fetchEmploymentStatus.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getUserStage() {
      try {
        const fetchUserStage = await customerApi.customerStage();
        this.customerStage = fetchUserStage.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },

    async getAgents() {
      try {
        const agents = await get(this.apiUrls.getDSAs);
        this.agents = agents.data.data.data;
        this.agents = this.agents.sort((a, b) => {
          if (a.full_name > b.full_name) {
            return 1;
          }
          if (a.full_name < b.full_name) {
            return -1;
          }
          return 0;
        });
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },

    async getBranches() {
      try {
        const branches = await get("/api/branches");
        this.branches = branches.data.branches;
      } catch (error) {
        this.$displayErrorMessage(error);
      }
    },

    resetSearch() {
      this.searchQuery = {};
      this.searchUsersList();
    },
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    async exportCsv() {
      this.$LIPS(true);
      try {
        const response = await customerApi.exportCustomers(
          queryParam(this.searchQuery)
        );
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.csv");
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (error) {
        this.$displayErrorMessage(error);
      } finally {
        this.$LIPS(false);
      }
    },

    async searchUsersList() {
      this.$LIPS(true);
      try {
        const query = {
          ...this.searchQuery,
          page: this.pageParams.page,
          limit: this.pageParams.limit
        };
        const fetchusersList = await customerApi.index(queryParam(query));
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
        } = fetchusersList.data.data[0];
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

        this.usersList = data;
        this.userMeta = fetchusersList.data.data.meta;
        eventBus.$emit("userStats", this.userMeta);
        eventBus.$emit("notification");
        this.OId = from;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },

    async postFeedbackComment(user) {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.feedbackModal = false;
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.postComment + user.id, {
              feedback: user.feedback
            })
              .then(({ data }) => {
                this.$LIPS(false);
                user.feedback = "";
                this.$swal({
                  icon: "success",
                  title: "Feedback Logged Successfully"
                });
                this.searchUsersList();
              })

              .catch(({ response: { data } }) => {
                const errData = data.data.errors;
                this.error = errData ? errData : data;

                this.$LIPS(false);
              });
          }
        })
        .catch(e => {});
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    getNextList(){
      window.onscroll = () =>{
        let bottomOfWindow = document.documentElement.scrollHeight + document.documentElement.scrollTop === document.documentElement.clientHeight;

        if(bottomOfWindow){
          console.log('got there');
          this.pageParams.page += 1;
          const query = {
          ...this.searchQuery,
          page: this.pageParams.page,
          limit: this.pageParams.limit,
          inActiveDays: 30
        };

        get(
          this.apiUrls.customerContact + queryParam(query)
        ).then(res => {
          this.usersList = this.usersList.concat(res?.data?.data[0].data);
        });
        
        }
      }
    },
    openModal(data) {
      this.comments = data.notifications;
      this.customer = data;
      this.feedbackModal = true;
    },
    closeModal() {
      this.feedbackModal = false;
    },
    openPopup(data) {
      this.message = data;
      this.feedbackPopup = true;
    },
    closePopup() {
      this.feedbackPopup = false;
    },
    viewUser(data) {
      this.$router.push({
        name: "userProfile",
        params: {
          customer: data,
          id: data.id
        }
      });
    },

    showNotification() {
      let notCookie = this.$getCookie("showNotification");
      if (notCookie !== null) {
        if (this.$getCookieValue("showNotification") === "true") {
          //*show modal
          this.showModal = true;

          this.$setCookie("showNotification", false);
        }
      }
    }
  }
};
</script>

<style>
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
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.customerTile {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 13px;
}
.mx-datepicker {
  width: 100%;
}

.avatarCircle {
  width: 45px;
  height: 45px;
  /* background: #00e396; */
  border-radius: 50px;
  color: white;
  text-align: center;
  font-size: 28px;
  margin-right: 20px;
}
</style>
