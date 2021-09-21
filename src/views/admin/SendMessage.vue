<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-gray-800 text-xl font-bold">Send Message</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div class="w-1/2 mt-16 ml-5 ">
        <div>
          <label class="typo__label p-2 font-bold">Select Role</label>
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
      <div class="mt-10 ml-5 w-1/2">
        <label class="typo__label p-2 font-bold">Enter Message</label>
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

      <div class="text-left mt-5 ml-5 w-1/2">
        <button
          class="altaraBlue text-white p-2 rounded-md"
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
            console.log(resp);

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
