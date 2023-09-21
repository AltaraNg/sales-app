<template>
  <div
    class="container mx-auto text-xs divide-y my-1 py-2"
    v-if="pageParam.total / pageParam.per_page > 1"
  >
    <div class="clearfix"></div>
    <div class="flex justify-between flex-row pt-2">
      <div class="">
        <strong class="box-border border-solid">
          Displaying {{ pageParam.from }} - {{ pageParam.to }} of
          {{ pageParam.total }}
        </strong>
      </div>

      <div class="flex flex-row divide-x">
        <div class="px-2"></div>
        <div class="px-2"></div>
      </div>

      <nav class="content-start">
        <ul class="flex flex-row divide-x">
          <!---->
          <li class="px-1">
            <a
              href="javascript:"
              @click="prev(1)"
              :class="{ 'cursor-text': !pageParam.first_page_url }"
              class="page-link"
              >First</a
            >
          </li>
          <li :class="{ 'cursor-text': !pageParam.prev_page_url }" class="px-1">
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
        this.$emit("next", firstPage);
      },
      prev(lastPage = null) {
        this.$emit("previous", lastPage);
      },
    },

    mounted() {},
  };
</script>
