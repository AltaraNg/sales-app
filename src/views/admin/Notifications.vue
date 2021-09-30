<template>
  <div class="md:ml-8">
    <div v-if="messages.length > 0">
      <div class="ml-2">
      <h1 class="text-2xl hidden md:contents">Notifications</h1>
      </div>
      <div class="block w-full ">
        <!-- Projects table -->

        <!-- Projects table -->
        <table
          class=" md:table w-full bg-transparent border-collapse hidden mt-8 ml-2"
        >
          <thead>
            <tr>
              <th
                class="px-3 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                S/N
              </th>
              <th
                class="px-3 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                From
              </th>
              <th
                class="px-3 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Message
              </th>

              <th
                class="px-3 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap  text-center"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:shadow-lg cursor-pointer"
              :key="index"
              @click="showDetail(message)"
              v-for="(message, index) in messages"
              :style="[
                index % 2 === 0
                  ? { 'background-color': 'white' }
                  : { 'background-color': '#F3F4F6' },
                message.read === 1 ? { color: 'gray' } : { color: 'black' }
              ]"
            >
              <th
                class="border-t-0 px-3 border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-center"
              >
                <div
                  class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
                >
                  {{ index + OId || "" }}
                </div>
              </th>
              <th
                class="border-t-0 border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-left w-10 "
              >
                {{ message.sender || "" }}
              </th>
              <th
                class="border-t-0 px-3 border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-left w-1/2"
              >
                {{ message.message | truncate(80) || "" }}
              </th>
              <th
                class="border-t-0 border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-center ml-0"
              >
                {{ message.created_at.slice(0, 10) || "" }}
              </th>
            </tr>
          </tbody>
        </table>

        <div class="contents md:hidden overflow-hidden">
          <div class="pt-10">
            <h3 class="text-center text-lg mb-10 font-bold">
              Messages
            </h3>
          </div>
          <div
            :key="index"
            v-for="(message, index) in messages"
            @click="showDetail(message)"
            :style="[
              index % 2 === 0
                ? { 'background-color': 'white' }
                : { 'background-color': 'white' },
              message.read === 1 ? { color: 'gray' } : { color: 'black' }
            ]"
          >
            <div class="customerTile">
              <div class="flex justify-between text-xs">
                <div class="flex items-stretch">
                  <div
                    :style="{ background: generateRandomColor() }"
                    class="avatarCircle"
                  >
                    {{ returnInitials(message.sender) || "" }}
                  </div>
                  <div class="self-center font-medium">
                    <span class="text-sm">{{
                      message.message | truncate(20) || ""
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-col my-auto">
                  <div class="font-bold">
                    {{ message.created_at.slice(0, 10) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="messages.length === 0 && $isProcessing === false">
      <zero-state
        :title="'No Messages'"
        :message="'You currently have no messages'"
      >
        <template v-slot:image>
          <img src="../../assets/img/thumb-up.png" />
        </template>
      </zero-state>
    </div>
      <vue-tailwind-modal
        :showing="showModal"
        @close="showModal = false"
        :showClose="true"
        :backgroundClose="true"
        :css="modalOption"
      >
        <div class="my-auto">
          <h4 class="h4 text-xs ml-4 mb-1 font-bold text-green-500">
            From: {{ currentMessage.sender }}
          </h4>
          <h4 class="h4 text-xs ml-4 mb-4 font-bold text-green-500">
            Sent: {{ formatDate(currentMessage.created_at) }}
          </h4>
          <p class="text-left ml-4">
            <span>{{ currentMessage.message }}</span>
          </p>
        </div>
      </vue-tailwind-modal>
      <div>
        <base-pagination
          :pageParam="pageParams"
          @fetchData="fetchMessages()"
        ></base-pagination>
      </div>
    </div>

    
  </div>
</template>

<script>
import moment from "moment";
import { get, put } from "../../utilities/api";
import { mapGetters } from "vuex";
import messageApi from "../../api/messages.js";
import queryParam from "../../utilities/queryParam";
import BasePagination from "../../components/BasePagination.vue";
import VueTailwindModal from "vue-tailwind-modal";
import ZeroState from "../../components/ZeroState.vue";
import Vue from "vue";
export default {
  components: {
    BasePagination,
    VueTailwindModal,
    ZeroState
  },
  data() {
    return {
      modalOption: {
        background: "smoke",
        modal: "max-h-80 h-64",
        close: "text-red-500 font-extrabold"
      },
      messages: [],
      urls: {
        message: `/api/message`
      },
      pageParams: {},
      OId: 1,
      searchQuery: {},
      currentMessage: "",
      showModal: false,
      modalOptions: {}
    };
  },
  async beforeMount() {
    await this.fetchMessages();
    this.$prepareNotifications();
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    async fetchMessages() {
      try {
      this.$LIPS(true);
      let userId = localStorage.getItem("user_id");

      const query = {
        ...this.searchQuery,
        page: this.pageParams.page,
        limit: this.pageParams.limit,
        receiver: userId
      };
      const messages = await messageApi.index(queryParam(query));

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
      } = messages.data.data;
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
      this.messages = messages.data.data.data;
      } catch (error) {
        this.$displayErrorMessage(err);        
      }
      finally{
        this.$LIPS(false);
      }
      
    },

    async updateRead(message) {
      this.$LIPS(true);
      let resp = await put(`/api/message/${message.id}`, { read: true });
      await this.$prepareNotifications();
      await this.fetchMessages();

      return "Success";
    },

    async showDetail(message) {
      if (message.read !== 1) {
        await this.updateRead(message);
      }
      this.currentMessage = message;
      this.showModal = true;
      this.$LIPS(false);
    },
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    returnInitials(name) {
      var names = name.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
    }
  },

  computed: {
    ...mapGetters(["getNotifications"])
  }
};
</script>

<style lang="css" scoped></style>
