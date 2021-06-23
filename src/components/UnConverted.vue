<template>
  <div>
    <div v-if="customers.length != 0" class="block w-full overflow-x-auto">
      <!-- Projects table -->

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
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
              Name
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Reg ID
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              phone
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              email
            </th>

            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Employment Status
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Customer Stage
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Contacted By
            </th>
            <th
              class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
            >
              Date Registered
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="pointer"
            v-on:click="viewUser(customer)"
            :key="index"
            v-for="(customer, index) in customers"
            :style="
              index % 2 === 0
                ? { 'background-color': 'white' }
                : { 'background-color': '#F3F4F6' }
            "
          >
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
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
              {{ customer.name || "" }}
            </th>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
            >
              {{ customer.reg_id || "" }}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ customer.phone || "" }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ customer.email || "" }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ customer.employment_status.name || "" }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ customer.customer_stage.name || "" }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ customer.users.full_name || "" }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
            >
              {{ $dateTimeConvert(customer.created_at) || "" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import customerApi from "../api/customer.js";
import queryParam from  "../utilities/queryParam";
export default {
  name: "Unconverted",
  data() {
    return {
      customers: [],
      pageParams: {},
      OId: 1, // **to persist serial number
      searchQuery: {
          unconverted: 4 // **default number of months
      }
    };
  },

  mounted() {
    this.getCustomer();
  },

  methods: {
    async getCustomer() {
      this.$LIPS(true);
      try {
        const query = {
          ...this.searchQuery,
          page: this.pageParams.page,
          limit: this.pageParams.limit
        };
       

        const fetchusersList = await customerApi.index(queryParam(query));
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
        } = fetchusersList.data.data[0];
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

        this.customers = data;

        this.OId = from;

        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    viewUser(data) {
      this.$router.push({
        name: "userProfile",
        params: {
          customer: data,
          id: data.id,
        },
      });
    },
  }
};
</script>

<style scoped></style>
