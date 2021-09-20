<template>
  <div>
    <h1 class="text-2xl mt-3 mb-10 ml-4">Notifications</h1>
    <div v-if="messages.length != 0" class="block w-full overflow-x-auto ml-4">
      <!-- Projects table -->

      <!-- Projects table -->
      <table class="w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              S/N
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center"
            >
              Message
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center"
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
                : { 'background-color': '#F3F4F6' },
                message.read === 1 ? {'color': '#20212B','font-weight': 100} : {'color': '#202124', 'font-weight': 800}
                ]
            "
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
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
            >
              {{ message.message | truncate(10) || "" }}
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center"
            >
              {{ message.created_at || "" }}
            </th>
          </tr>
        </tbody>
      </table>
      
      <vue-tailwind-modal
        :showing="showModal"
        @close="showModal = false"
        :showClose="true"
        :backgroundClose="false"
        :css="modalOptions"
      >
        <h4 class="h4 text-sm">Sent: {{ currentMessage.created_at }}</h4>
        <p>Message: {{ currentMessage.message }}</p>
      </vue-tailwind-modal>
      <div>
        <base-pagination :pageParam="pageParams" @fetchData="fetchMessages()"></base-pagination>
      </div>
    </div>
    
    <div v-else class="chatBox">
      No messages available
    </div>
  </div>
</template>

<script>
import { get, put } from "../../utilities/api";
import messageApi from "../../api/messages.js";
import queryParam from "../../utilities/queryParam";
import BasePagination from "../../components/BasePagination.vue";
import VueTailwindModal from "vue-tailwind-modal";
import Vue from 'vue';
export default {
  components: {
    BasePagination,
    VueTailwindModal
  },
  data() {
    return {
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
      let m = this.messages.findIndex(item => {
        return item.id === message.id;
      })

      this.fetchMessages();
      return "Success";
    },

    async showDetail(message) {
      if (message.read !== 1) {
        await this.updateRead(message);
      }
      this.currentMessage = message;
      this.showModal = true;
      this.$LIPS(false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
