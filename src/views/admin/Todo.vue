<template>
  <div>
    <div
      class="relative min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-3"
    >
      <div class="hidden md:contents">
        <div class="flex-col">
          <div class="flex">
            <div class="w-full lg:w-2/12 xl:w-2/12">
              <div class="relative w-50 mb-3 mr-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  From Date
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.fromDate"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-2/12">
              <div class="relative w-50 mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  To Date
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.toDate"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <div
            v-on:click="getTodos()"
            class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
          >
            Search
          </div>
          <div
            v-on:click="resetSearch()"
            class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
          >
            Reset
          </div>
        </div>

        <table class="items-center w-full bg-transparent border-collapse mt-5">
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
                Todo
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Type
              </th>
              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Due Date
              </th>

              <th
                class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="pointer"
              :key="index"
              v-for="(todo, index) in todos"
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
                  {{ index + 1 || "" }}
                </div>
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
              <router-link :to="{ name: 'userProfile', params: {customer: todo.customer, id: todo.customer.id } }"> 
                {{ todo.customer.name || "Not Available" }}
              </router-link>
              </th>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                {{ todo.todo || "" }}
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ todo.type || "" }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                {{ todo.due_date || "Not Available" }}
              </td>

              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                <input
                  @change="checkTodo(todo)"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-gray-600"
                  :checked="todo.status === 'done' ? true : false"
                />
              </td>
            </tr>
            <tr v-if="todos.length === 0">
              <td colspan="6"  class="border-t-0 px-6 border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 justify-center flex ">
                You currently have no todos
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="contents md:hidden">
        <div class="flex-col">
          <div class="flex flex-wrap">
            <div class="w-full lg:w-2/12 xl:w-3/12">
              <div class="relative w-50 mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  From Date
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.fromDate"
                  ></date-picker>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-2/12 xl:w-3/12">
              <div class="relative w-50 mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  To Date
                </label>
                <div>
                  <date-picker
                    valueType="format"
                    v-model="searchQuery.toDate"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div
              v-on:click="getTodos()"
              class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
            >
              Search
            </div>
            <div
              v-on:click="resetSearch()"
              class="w-2/5 py-2 altaraBlue rounded h-10 text-white text-center"
            >
              Reset
            </div>
          </div>
          <div :key="index" v-for="(data, index) in todos" class="mt-5">
            <div class="customerTile">
              <div class="flex justify-between">
                <div class="flex items-stretch">
                  <div class="self-center font-medium">
                    {{ data.todo || "" }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="avatarCircle">
                    <input
                      @change="checkTodo(data)"
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-gray-600"
                      :checked="data.status === 'done' ? true : false"
                    />
                  </div>
                  <div class="text-xs">
                    {{ data.due_date || "Not Available" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, put } from "../../utilities/api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import queryParam from "../../utilities/queryParam";
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      todos: [],
      apiUrls: {
        getTodos: `/api/todo`,
      },
      searchQuery: {},
    };
  },
  async created() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      this.$LIPS(true);

      try {
        const query = {
          user: localStorage.getItem("user_id"),
          ...this.searchQuery,
        };

        const fetchTodos = await get(this.apiUrls.getTodos + queryParam(query));
        this.todos = fetchTodos.data.data.data;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    checkTodo(data) {
      this.$LIPS(true);
      put(this.apiUrls.getTodos + "/" + data.id, {
        status: data.status === "done" ? "not done" : "done",
      })
        .then(() => {
          this.$LIPS(false);
          this.$swal({
            icon: "success",
            title: "Todo Updated Successfully",
          });
          this.getTodos();
        })

        .catch(({ response: { data } }) => {
          const errData = data.data.errors;
          this.error = errData ? errData : data;

          this.$LIPS(false);
        });
    },
    resetSearch() {
      this.searchQuery = {};
    },
  },
};
</script>

<style>
</style>