<template>
  <div>
    <div>
      <div
        class="relative min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-3"
      >
        <div class="hidden md:contents">
          <div class="flex-col">
            <div class="flex justify-between">
              <div class="w-full lg:w-2/12 xl:w-2/12">
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
              <div class="w-full lg:w-2/12 xl:w-2/12">
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
              <div class="w-full lg:w-2/12 xl:w-2/12">
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
                      v-model="searchQuery.endDate"
                    ></date-picker>
                  </div>
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
            class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
          >
            Search
          </div>
          <div
            v-on:click="resetSearch()"
            class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
          >
            Reset
          </div>
        </div>
      </div>

      <div class="contents md:hidden relative">
        <div class="text-center py-2 font-medium px-5">
          List of contacted customers
        </div>
        <div v-if="usersList.length > 0">
          <div :key="index" v-for="(user, index) in usersList">
            <div v-on:click="viewUser(user)" class="customerTile">
              <div class="flex justify-between">
                <div class="flex items-stretch">
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
                <div class="flex flex-col">
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
                    {{ index + pageNumber || "" }}
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
                  v-if="employmentStatus.length > 0"
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{
                    employmentStatus.find(
                      x => x.id === user.employment_status_id
                    ).name || ""
                  }}
                </td>
                <td
                  v-if="customerStage.length > 0"
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{
                    customerStage.find(x => x.id === user.customer_stage_id)
                      .name || ""
                  }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  {{ user.users.full_name || "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-1 flex justify-between">
          <button
            v-if="prev_page_url"
            @click="prevPage"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Previous
          </button>
          <button
            v-if="next_page_url"
            @click="nextPage"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Next
          </button>
        </div>
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
              <!-- <div class="w-full md:w-6/12 h-420-px overflow-x-auto px-4">
                <table
                  class="items-center w-full bg-transparent border-collapse"
                >
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
                        Feedback
                      </th>
                      <th
                        class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index" v-for="(data, index) in comments">
                      <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                      >
                        {{ index + 1 }}
                      </th>
                      <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                      >
                        <div
                          class="w-16 truncate"
                          v-on:click="openPopup(data.data.feedback)"
                        >
                          {{ data.data.feedback }}
                        </div>
                      </th>
                      <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                      >
                        {{ data.data.date.split("T")[0] || "Not Available" }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div> -->
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
import { get, post } from "../../utilities/api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import queryParam from "../../utilities/queryParam";
import { eventBus } from "../../main";

export default {
  components: {
    DatePicker
  },

  props: {
    size: {
      type: Number,
      required: false,
      default: 20
    }
  },
  computed: {},
  data() {
    return {
      pageNumber: 1,
      searchQuery: {},
      searchFilter: {},
      usersList: [],
      employmentStatus: [],
      customerStage: [],
      comments: [],
      message: "",
      prev_page_url: "",
      next_page_url: "",
      apiUrls: {
        getEmploymentStatus: `/api/employment_status`,
        getusersList: `/api/customer_contact`,
        getStage: `/api/customer_stage`,
        postComment: `/api/feedback`
      },
      feedback: "",
      customer: {},
      feedbackModal: false,
      feedbackPopup: false,
      error: {}
    };
  },
  async created() {
    eventBus.$emit("fireMethod");
    await this.searchUsersList();
    await this.getEmploymentStatus();
    await this.getUserStage();
  },
  methods: {
    nextPage() {
      this.pageNumber++;
      this.searchUsersList();
    },
    prevPage() {
      this.pageNumber--;
      this.searchUsersList();
    },
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
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    async searchUsersList() {
      this.$LIPS(true);

      try {
        const query = { ...this.searchQuery, page: this.pageNumber };
        const fetchusersList = await get(
          this.apiUrls.getusersList + queryParam(query)
        );

        this.usersList = fetchusersList.data.data.data;
        this.next_page_url = fetchusersList.data.data.next_page_url;
        this.prev_page_url = fetchusersList.data.data.prev_page_url;
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
