<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-gray-800 text-xl font-bold">Register Customer</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase"></h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Name *
              </label>
              <input
                v-validate="'required'"
                type="text"
                v-model="customer.name"
                name="name"
                :class="[
                  errors.first('name') || error.name ? 'is-invalid' : '',
                ]"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
              />
              <small class="error-control" v-if="errors.first('name')">
                {{ errors.first("name") }}
              </small>
              <small class="error-control" v-if="error.name">{{
                error.name[0]
              }}</small>
            </div>
          </div>

          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                v-model="customer.email"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                :class="[error.email ? 'is-invalid' : '']"
              />
              <small class="error-control" v-if="errors.first('email')">
                {{ errors.first("email") }}
              </small>
              <small class="error-control" v-if="error.email">{{
                error.email[0]
              }}</small>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                v-validate="'required'"
                name="phone"
                v-model="customer.phone"
                :class="[
                  errors.first('phone') || error.phone ? 'is-invalid' : '',
                ]"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
              />
              <small class="error-control" v-if="errors.first('phone')">
                {{ errors.first("phone") }}
              </small>
              <small class="error-control" v-if="error.phone">{{
                error.phone[0]
              }}</small>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Monthly Income *
              </label>
              <input
                maxlength="11"
                type="number"
                v-validate="'required'"
                name="income"
                :class="[
                  errors.first('income') || error.monthly_income
                    ? 'is-invalid'
                    : '',
                ]"
                v-model="customer.monthly_income"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                value="New York"
              />
              <small class="error-control" v-if="errors.first('income')">
                {{ errors.first("income") }}
              </small>
              <small class="error-control" v-if="error.monthly_income">{{
                error.monthly_income[0]
              }}</small>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Employment Status *
              </label>
              <!-- <input
                type="text"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
              /> -->

              <select
                v-model="customer.employment_status_id"
                v-validate="'required'"
                name="employment status"
                :class="[
                  errors.first('employment status') ||
                  error.employment_status_id
                    ? 'is-invalid'
                    : '',
                ]"
                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
              >
                <option disabled selected="selected">
                  Selecet Employment Status
                </option>
                <option
                  :value="type.id"
                  :key="type.id"
                  v-for="type in employmentStatus"
                >
                  {{ type.name }}
                </option>
              </select>
              <small
                class="error-control"
                v-if="errors.first('employment status')"
              >
                {{ errors.first("employment status") }}
              </small>
              <small class="error-control" v-if="error.employment_status_id">{{
                error.employment_status_id[0]
              }}</small>
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-gray-400" />

        <div class="text-center mt-6">
          <button
            v-on:click="submitForm()"
            class="altaraBlue text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { get, post } from "../../utilities/api";

export default {
  data() {
    return {
      employmentStatus: [],
      customer: {},
      error: {},
      apiUrls: {
        register: `/api/customer_contact`,
        getEmploymentStatus: `/api/employment_status`,
      },
    };
  },
  async created() {
    await this.getEmploymentStatus();
  },
  methods: {
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

    async submitForm() {
      const validate = await this.$validator.validateAll();
      this.$validator
        .validateAll()
        .then((result) => {
          if (result) {
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.register, this.customer)
              .then(({ data }) => {
                this.$LIPS(false);
                this.$swal({
                  icon: "success",
                  title: "Customer registered Logged",
                });
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
  },
};
</script>