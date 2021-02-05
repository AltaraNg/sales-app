<template>
  <div>
    <sidebar />
    <br />
    <div class="md:ml-56 bg-white">
      <div class="px-4 md:px-10 mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full md:w-4/12 bg-white w-full shadow-lg rounded p-4">
            <img class="" :src="avatar" alt="..." />
            <h2 class="text-xl font-bold text-center">{{ customer.name }}</h2>
          </div>
          <div
            class="w-full md:w-8/12 bg-white w-full shadow-lg rounded p-4 h-420-px"
          >
            <div class="space-y-4">
              <div class="flow-root">
                <div class="my-4"><b>Name: </b> {{ customer.name }}</div>
              </div>
              <div class="flow-root">
                <div class="my-4"><b>Reg ID: </b> {{ customer.reg_id }}</div>
              </div>
              <div class="flow-root">
                <div class="my-4"><b>Phone: </b> {{ customer.phone }}</div>
              </div>
              <div class="flow-root">
                <div class="my-4"><b>Email: </b> {{ customer.email }}</div>
              </div>
              <div class="flow-root">
                <div class="my-4">
                  <b>Employment Status: </b>
                  {{ employmentStatus || "N/A" }}
                </div>
              </div>
              <div class="flow-root">
                <div class="my-4">
                  <b>Customer Stage: </b>
                  {{ customerStage || "N/A" }}
                </div>
              </div>
              <div class="flow-root">
                <div class="my-4">
                  <b>Feedbacks: </b>{{ customer.users.full_name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 md:px-10 mx-auto">
        <div class="flex flex-wrap">
          <div
            class="w-full md:w-8/12 bg-white w-full shadow-lg rounded p-4 h-420-px overflow-x-auto"
          >
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
                <tr
                  :key="index"
                  v-for="(data, index) in customer.notifications"
                >
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
          </div>
          <div class="w-full md:w-4/12 bg-white w-full shadow-lg rounded p-4">
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
                  : 'border',
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
    <br />
    <div v-if="feedbackPopup" id="overlay">
      <div class="flex items-center justify-center bottom-0 w-full h-full">
        <div
          class="bg-white rounded-lg md:ml-56 m-16 py-4 md:w-6/12 sm:w-8/12 h-350-px"
        >
          <div class="relative w-full px-4 max-w-full flex justify-between">
            <h3 class="font-semibold text-base text-gray-800">
              {{ customer.name }} - Feedbacks
            </h3>
            <i class="fas fa-times-circle" v-on:click="closePopup()"></i>
          </div>
          <br />
          <div class="px-4 h-290-px overflow-x-auto">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import avatar from "@/assets/img/avatar.png";

export default {
  name: "UserProfile",
  props: ["customer"],

  components: {
    Sidebar,
    HeaderStats,
  },
  data() {
    return {
      avatar,
      pageNumber: 1,
      searchQuery: {},
      searchFilter: {},
      usersList: [],
      employmentStatus: "",
      customerStage: "",
      comments: [],
      message: "",
      prev_page_url: "",
      next_page_url: "",
      apiUrls: {
        getEmploymentStatus: `/api/employment_status`,
        getusersList: `/api/customer_contact`,
        getStage: `/api/customer_stage`,
        postComment: `/api/contact_notification/`,
      },
      feedback: "",
      customer: {},
      feedbackModal: false,
      feedbackPopup: false,
      error: {},
    };
  },
  async created() {
    await this.getEmploymentStatus();
    await this.getUserStage();
    await this.searchUsersList();
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
        this.employmentStatus = fetchEmploymentStatus.data.data.find(
          (x) => x.id === customer.employment_status_id
        ).name;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getUserStage() {
      try {
        const fetchUserStage = await get(this.apiUrls.getStage);
        this.customerStage = fetchUserStage.data.data.find(
          (x) => x.id === customer.customer_stage_id
        ).name;
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
        const query = { ...this.searchQuery, page: this.pageNumber };
        const fetchusersList = await get(
          this.apiUrls.getusersList + queryParam(query)
        );
        console.log("policeing", query);

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
        .then((result) => {
          if (result) {
            this.feedbackModal = false;
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.postComment + user.id, {
              feedback: user.feedback,
            })
              .then(({ data }) => {
                this.$LIPS(false);
                user.feedback = "";
                this.$swal({
                  icon: "success",
                  title: "Feedback Logged Successfully",
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
        .catch((e) => {});
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    openModal(data) {
      this.comments = data.notifications;
      this.customer = data;
      data.notifications.length === 0 ? "" : (this.feedbackModal = true);
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
        },
      });
    },
  },
};
</script>

