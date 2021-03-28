<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Staff Id
                </label>
                <input
                  type="text"
                  v-model="form.staff_id"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  v-model="form.password"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-700">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  v-on:click="login()"
                  class="altaraBlue text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../../utilities/auth";
import { post } from "../../utilities/api";
// import Flash from "../../utilities/flash";
export default {
  data() {
    return {
      form: { staff_id: "", password: "" },
      cardMT: "",
      error: {},
    };
  },
  async created() {},
  methods: {
    async login() {
      if (this.$network()) {
        this.$LIPS(true);
        this.error = {};
        await post("/api/login", this.form)
          .then(({ data }) => {
            if (data.auth) {
              Auth.set(data);
            }
            this.$LIPS(false);

            this.$router.push("/admin");
          })
          .catch(({ response: { data } }) => {
            this.error = data.errors ? data.errors : data;
            this.$LIPS(false);

            this.$swal({
              icon: "error",
              title: "Incorrect Login Details",
            });
          });
      } else this.$networkErr();
    },
  },
};
</script>
