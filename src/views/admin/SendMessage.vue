<template>
  <div>
    <div>
      <h1 class="text-lg font-bold">Send Message</h1>
      <div class="border w-1/2 mt-3 h-40 overflow-auto">
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
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }"
              ><span
                class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"
                >{{ values.length }} roles selected</span
              ></template
            >
          </multiselect>
        </div>
      </div>
      <div class="mt-10 w-1/2">
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

      <div class="text-center mt-5 w-1/2">
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
    Multiselect,
  },
  data() {
    return {
      recepients: [],
      message: "",
      roles: [],
      selectedUser: null,
      URLS: {
        roles: `/api/role`,
        sendMessage: `/api/send-internal-message`,
      },
      selectAll: null,
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
        let ids = this.recepients.map((item) => {
          return item.id;
        });
        let data = {
          roles: ids,
          message: this.message,
        };
        post(this.URLS.sendMessage, data)
          .then((resp) => {
            console.log(resp);

            this.$swal({
              icon: "success",
              title: "Message Sent Successfully",
            });

            this.message = "";
            this.recepients = "";
          })
          .catch((err) => {})
          .finally(() => {
            this.$LIPS(false);
          });
      } else {
        alert("Enter missing fields!!!");
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
</style>