<template>
  <div class="container mx-auto text-xs divide-y my-1 py-2">
    <div class="clearfix"></div>
    <div class="flex justify-between flex-row pt-2">
      <div class="">
        <strong class="box-border border-solid">
          Displaying: {{ pageParam.from }} - {{ pageParam.to }} of
          {{ pageParam.total }}
        </strong>
      </div>

      <div class="flex flex-row divide-x">
        <div class="px-2">
          <span class="">set current Page: </span>
          <input
            class="input bg-gray-300 text-center"
            type="number"
            v-model="pageParam.page"
            style="max-width: 50px"
            @keyup.enter="fetchData(pageParam.page)"
          />
        </div>
        <div class="px-2">
          <span class="">set page-size: </span>
          <input
            class="input bg-gray-300 text-center"
            type="number"
            v-model="pageParam.limit"
            style="max-width: 50px"
            @keyup.enter="fetchData(pageParam.limit)"
          />
        </div>
      </div>

      <nav class="content-start">
        <ul class="flex flex-row divide-x">
          <!---->
          <li
            :class="{ disabled: !pageParam.first_page_url }"
            class="px-1"
          >
            <a href="javascript:" @click="prev(1)" class="page-link">First</a>
          </li>
          <li :class="{ disabled: !pageParam.prev_page_url }" class="px-1">
                      <a href="javascript:" @click="prev()" class="page-link">Prev</a>
          </li>
          <!---->
          <li class="px-1">
            <span class="page-link w-100"
              >page:{{ pageParam.current_page }}</span
            >
          </li>
          <!---->
          <li :class="{ disabled: !pageParam.next_page_url }" class="px-1">
            <a href="javascript:" @click="next()" class="page-link">Next</a>
          </li>
          <li :class="{ disabled: !pageParam.last_page_url }" class="px-1">
            <a
              href="javascript:"
              @click="next(pageParam.last_page)"
              class="page-link"
              >Last</a
            >
          </li>
          <!---->
        </ul>
      </nav>
    </div>
  </div>
</template>
        <script>
export default {
  components: {},
  props: {
    pageParam: {
      type: Object,
      required: true,
    },
  },

  methods: {
    next(firstPage = null) {
      if (this.pageParam.next_page_url) {
        this.pageParam.page = firstPage
          ? firstPage
          : parseInt(this.pageParam.page) + 1;
        this.fetchData();
      }
    },
    prev(lastPage = null) {
      if (this.pageParam.prev_page_url) {
        this.pageParam.page = lastPage
          ? lastPage
          : parseInt(this.pageParam.page) - 1;
        this.fetchData();
      }
    },
    fetchData(data) {
      this.$emit("fetchData", data);
    },
  },

  created() {
    this.pageParam.page = 1;
  },
};
</script>
<
