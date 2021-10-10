<template>
  <div
    class="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-gray-800 text-xl font-bold md:ml-3 ml-0">Send Message</h6>
      </div>
    </div>
    <div class="py-10 pt-0 md:px-8">
      <div class="mt-10 md:w-2/3">
        <div>
          <label class="typo__label p-2 font-bold mb-2">Select Role</label>
          <multiselect
            v-model="recepients"
            :options="roles"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Pick roles ..."
            label="name"
            track-by="id"
            :preselect-first="true"
            :option-height="40"
            :taggable="true"
          >
          </multiselect>
        </div>
      </div>
      <div class="mt-10 md:w-2/3">
        <label class="typo__label p-2 font-bold mb-2">Enter Message</label>
        <textarea
          rows="8"
          cols="40"
          type="text"
          name="todo"
          class="p-3 border"
          placeholder="Enter Message ..."
          v-model="message"
        >
        </textarea>
      </div>

      <div class="text-left mt-5 md:w-1/2">
        <button
          class="altaraBlue text-white p-2 rounded-md w-full md:w-2/3"
          @click="sendMessage()"
        >
          <i class="far fa-paper-plane mr-2"></i>Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../utilities/api";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      recepients: [],
      message: "",
      roles: [],
      selectedUser: null,
      URLS: {
        roles: `/api/role`,
        sendMessage: `/api/send-internal-message`
      },
      selectAll: null
    };
  },
  mounted() {
    this.fetchDsa();
  },
  methods: {
    async fetchDsa() {
      this.$LIPS(true);
      const agents = await get(this.URLS.roles);
      this.roles = agents.data.roles;
      this.$LIPS(false);
    },

    sendMessage() {
      this.$LIPS(true);
      if (this.message !== "" && this.recepients.length > 0) {
        let ids = this.recepients.map(item => {
          return item.id;
        });
        let data = {
          roles: ids,
          message: this.message
        };
        post(this.URLS.sendMessage, data)
          .then(resp => {
            this.$swal({
              icon: "success",
              title: "Message Sent Successfully"
            });

            this.message = "";
            this.recepients = "";
          })
          .catch(err => {})
          .finally(() => {
            this.$prepareNotifications();

            this.$LIPS(false);
          });
      } else {
        alert("Enter missing fields!!!");
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped></style>
