<template>
  <div>
    <sidebar />
    <br />
    <div class="contents md:hidden relative">
      <div class="altaraBlue">
        <div class="flex justify-around">
          <div
            :style="{ background: generateRandomColor() }"
            class="text-center text-white text-7xl rounded-full my-11 h-32 w-32 flex items-center justify-center"
          >
            {{ customer.name[0].toUpperCase() }}
          </div>
        </div>
        <div class="mb-6 text-center text-xl text-white text-3xl text-white">
          {{ customer.name }}
        </div>
        <div class="flex flex-wrap">
          <div class="w-full mx-2">
            <ul class="flex mb-0 list-none flex-wrap pt-3 flex-row">
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(1)"
                  v-bind:class="{
                    'text-white': openTab !== 1,
                    'bg-white': openTab === 1,
                  }"
                >
                  Basic Info
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(2)"
                  v-bind:class="{
                    'text-white': openTab !== 2,
                    'bg-white': openTab === 2,
                  }"
                >
                  Feedbacks
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(3)"
                  v-bind:class="{
                    'text-white': openTab !== 3,
                    ' bg-white': openTab === 3,
                  }"
                >
                  Todo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="relative flex flex-col min-w-0 break-words w-full mx-2">
        <div class="py-5 flex-auto">
          <div class="tab-content tab-space">
            <div
              v-bind:class="{
                hidden: openTab !== 1,
                block: openTab === 1,
              }"
            >
              <p>
                <b>Name:</b> {{ customer.name }}<br /><br />
                <b>Reg ID:</b> {{ customer.reg_id }}<br /><br />
                <b>Phone:</b> {{ customer.phone }}<br /><br />
                <b>Email:</b> {{ customer.email }}<br /><br />
                <b>Employment Status:</b> {{ employmentStatus || "N/A"
                }}<br /><br />
                <b>Customer Stage:</b> {{ customerStage || "N/A" }}<br />
              </p>
            </div>
            <div
              v-bind:class="{
                hidden: openTab !== 2,
                block: openTab === 2,
              }"
              class="px-5 relative"
            >
              <div
                v-on:click="logFeedbackPopup()"
                class="absolute altaraBlue text-white bottom-0 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
              >
                +
              </div>
              <div
                :key="index"
                v-for="(data, index) in customer.notifications"
                class="chatBox"
              >
                <div
                  v-on:click="openPopup(data.data.feedback)"
                  class="flex justify-between"
                >
                  <div class="flex">
                    <div class="space0"></div>
                    <div class="self-center w-80 truncate">
                      {{ data.data.feedback }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="font-light text-xs">
                      {{ data.data.date.split("T")[0] || "Not Available" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-bind:class="{
                hidden: openTab !== 3,
                block: openTab === 3,
              }"
            >
              <div class="mx-5">
                <div class="customerTile">
                  <div class="flex justify-between">
                    <div class="flex items-stretch">
                      <div class="self-center font-medium">test</div>
                    </div>
                    <div class="flex flex-col">
                      <div class="avatarCircle">
                        <input
                          type="checkbox"
                          class="form-checkbox h-5 w-5 text-gray-600"
                          checked
                        />
                      </div>
                      <div class="text-xs">2021-02-5</div>
                    </div>
                  </div>
                </div>
                <div class="customerTile">
                  <div class="flex justify-between">
                    <div class="flex items-stretch">
                      <div class="self-center font-medium">test 0</div>
                    </div>
                    <div class="flex flex-col">
                      <div class="avatarCircle">
                        <input
                          type="checkbox"
                          class="form-checkbox h-5 w-5 text-gray-600"
                        />
                      </div>
                      <div class="text-xs">2021-02-5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:contents relative">
      <div class="md:ml-56 bg-white">
        <div class="px-4 md:px-10">
          <div class="flex flex-wrap">
            <div class="w-full md:w-4/12 bg-white w-full shadow-lg rounded p-4">
              <div
                :style="{ background: generateRandomColor() }"
                class="text-center text-white text-7xl rounded-full mt-11 mb-4 h-32 w-32 flex items-center justify-center mx-auto"
              >
                {{ customer.name[0].toUpperCase() }}
              </div>
              <h2 class="text-xl font-bold text-center">{{ customer.name }}</h2>

              <div class="space-y-4 px-5 shadow-xl color-white">
                <div class="flow-root">
                  <div class="mt-5 mb-3">
                    <b>Reg ID: </b> {{ customer.reg_id }}
                  </div>
                </div>
                <div class="flow-root">
                  <div class="my-3"><b>Phone: </b> {{ customer.phone }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3"><b>Email: </b> {{ customer.email }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Employment Status: </b>
                    {{ employmentStatus || "N/A" }}
                  </div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Customer Stage: </b>
                    {{ customerStage || "N/A" }}
                  </div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Feedbacks: </b>{{ customer.users.full_name }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="relative w-full overscroll-contain h-screen md:w-8/12 bg-white w-full shadow-lg rounded p-4 h-420-px"
            >
              <div
                v-on:click="logFeedbackPopup()"
                class="absolute altaraBlue text-white bottom-10 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
              >
                +
              </div>
              <div
                :key="index"
                v-for="(data, index) in customer.notifications"
                class="chatBox"
              >
                <div
                  v-on:click="openPopup(data.data.feedback)"
                  class="flex justify-between"
                >
                  <div class="flex">
                    <div class="space0"></div>
                    <div class="self-center w-80 truncate">
                      {{ data.data.feedback }}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="font-light text-xs">
                      {{ data.data.date.split("T")[0] || "Not Available" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

    <div v-if="logFeedbackPopupValue" id="overlay">
      <div class="flex items-center justify-center bottom-0 h-full">
        <div
          class="bg-white rounded-lg md:ml-56 m-16 py-4 md:w-6/12 sm:w-8/12 h-350-px"
        >
          <div class="relative px-4 flex justify-between">
            <h3 class="font-semibold text-base text-gray-800">
              {{ customer.name }} - Log Feedback
            </h3>
            <i
              class="fas fa-times-circle"
              v-on:click="closeFeedbackPopup()"
            ></i>
          </div>
          <br />
          <div class="px-4 h-290-px overflow-x-auto">
            <textarea
              rows="8"
              cols="40"
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
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import avatar from "@/assets/img/avatar.png";
import { post } from "@/utilities/api";

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
      openTab: 1,
      feedbackModal: false,
      feedbackPopup: false,
      logFeedbackPopupValue: false,
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
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    async postFeedbackComment(user) {
      this.$validator
        .validateAll()
        .then((result) => {
          if (result) {
            this.closeFeedbackPopup();
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.postComment + user.id, {
              feedback: user.feedback,
            })
              .then(() => {
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
    logFeedbackPopup() {
      this.logFeedbackPopupValue = true;
    },
    closeFeedbackPopup() {
      this.logFeedbackPopupValue = false;
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
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
  },
};
</script>

<style>
.chatBox {
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.05);
  border-radius: 0px 10px 10px 10px;
  padding: 15px 10px;
  margin-bottom: 15px;
  width: 100%;
}
.space0 {
  height: 45px;
  /* background: #00e396; */
}
</style>

