<template>
  <div class="md:ml-12">
    <h1 class="text-2xl mt-3 mb-10 md:ml-4 hidden md:contents">Notifications</h1>
    <div
      v-if="messages.length != 0"
      class="block w-full md:ml-4"
    >
      <!-- Projects table -->

      <!-- Projects table -->
      <table class=" md:contents w-full bg-transparent border-collapse hidden">
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
              From
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Message
            </th>
            
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap  text-center"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="pointer"
            :key="index"
            @click="showDetail(message)"
            v-for="(message, index) in messages"
            :style="[
              index % 2 === 0
                ? { 'background-color': 'white' }
                : { 'background-color': 'white' },
              message.read === 1 ? { color: 'gray' } : { color: 'black' }
            ]"
          >
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
            >
              <div
                class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
              >
                {{ index + OId || "" }}
              </div>
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left "
            >
              {{ message.sender || "" }}
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left  "
            >
              {{ message.message | truncate(45) || "" }}
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
            >
              {{ (message.created_at).slice(0, 10) || "" }}
            </th>
          </tr>
        </tbody>
      </table>

      <div class="contents md:hidden">
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
                  {{ message.sender[0].toUpperCase() || "" }}
                </div>
                <div class="self-center font-medium">
                  <span class="text-sm">{{ message.message | truncate(20) || "" }}</span>
                </div>
              </div>
              <div class="flex flex-col my-auto">
                <div class="font-bold">
                  {{ (message.created_at).slice(0, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <vue-tailwind-modal
        :showing="showModal"
        @close="showModal = false"
        :showClose="true"
        :backgroundClose="true"
        :css="modalOptions"
      >
        <div class="my-auto">
          <h4 class="h4 text-xs ml-4 mb-4 font-bold text-green-500">
            Sent: {{ (currentMessage.created_at) }}
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

    <div v-else class="chatBox">
      No messages available
    </div>
  </div>
</template>

<script>
import { get, put } from "../../utilities/api";
import { mapGetters } from "vuex";
import messageApi from "../../api/messages.js";
import queryParam from "../../utilities/queryParam";
import BasePagination from "../../components/BasePagination.vue";
import VueTailwindModal from "vue-tailwind-modal";
import Vue from "vue";
export default {
  components: {
    BasePagination,
    VueTailwindModal
  },
  data() {
    return {
      modalOptions: {
        background: "bg-gray-200",
        modal: "max-h-80 w-1/2",
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
  mounted() {
    this.fetchMessages();
    this.$prepareNotifications();
  },
  methods: {
    async fetchMessages() {
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
      this.$LIPS(false);
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
    }
  },

  computed: {
    ...mapGetters(["getNotifications"])
  }
};
</script>

<style lang="scss" scoped></style>
