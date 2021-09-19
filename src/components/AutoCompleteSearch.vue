<template>
  <div>
    <div class="md:flex md:flex-row ">
      <div class="px-1 flex-1">
        <input
          placeholder="Search Customer"
          @blur="onBlur"
          @focus="onFocus"
          @keydown.down="onDownKey"
          @keydown.enter="onEnterKey"
          @keydown.esc="onEscape"
          @keydown.up="onUpKey"
          ref="search"
          type="text"
          class="mx-input"
          v-model="search"
        />
        <span class="" ref="text" v-html="displayText"></span>

        <div class="">
          <ul class="z-10" v-if="open && customers.length">
            <li :key="index" class="" v-for="(customer, index) in customers">
              <a
                :class="selectIndex === index && ''"
                @mousedown.prevent="select(customer)"
                class=" d-flex justify-content-between"
                v-html="getAutocomplete(customer)"
              >
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class=" w-full flex-1 flex-row text-center ">
        <span
          class="radio mb-0 flex-1 mx-3 text-xs"
          v-for="{ title, column } in searchColumns"
        >
          <input
            :id="column"
            :value="column"
            type="radio"
            v-model="searchColumn"
          />
          <label :for="column">{{ title | capitalize }}</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import queryParam from "../utilities/queryParam";
import { get, post } from "../utilities/api";

export default {
  name: "AutoCompleteSearch",
  props: {
    url: { type: String, required: true },
    title: { type: String, required: true }
  },
  data() {
    return {
      search: "",
      open: false,
      customers: [],
      selectIndex: 0,
      displayText: "",
      searchColumn: "name",
      searchColumns: [
        { title: "customer name", column: "name" },
        { title: "phone number", column: "phone" }
      ]
    };
  },

  mounted() {
    this.inputValue = this.currentValue;
  },

  watch: {
    searchColumn: function(newVal) {
      newVal === "phone" && (this.customers = []);
    },

    search: function(newVal) {
      if (!!newVal.trim()) {
        if (!this.isStringLengthValid(newVal))
          return Flash.setError(
            "search should not be more than " +
              (this.searchColumn === "name" ? " 3 " : " 1 ") +
              "words"
          );

        let searchableFields = {};
        searchableFields[this.searchColumn] = this.search;

        get(this.url + queryParam(searchableFields))
          .then(res => {
            this.customers = res?.data?.data[0]?.data;
          })
          .catch(() => Flash.setError("error fetching result"));
      }
    }
  },

  methods: {
    onDownKey() {
      this.customers.length - 1 > this.selectIndex && this.selectIndex++;
    },

    onUpKey() {
      this.selectIndex > 0 && this.selectIndex--;
    },

    onEnterKey() {
      const option = this.customers[this.selectIndex];
      if (option) this.select(option);
    },

    select(option) {
      this.displayText = this.getAutocomplete(option);
      this.$emit("customer-selected", option.id);
      this.$router.push(`/admin/userProfile/${option.id}`);
      this.$refs.search.blur();
    },

    toggle({ target }) {
      if (target === this.$refs.toggle || target === this.$refs.search) {
        if (this.open) {
          if (target !== this.$refs.search) this.$refs.search.blur();
        } else this.$refs.search.focus();
      }
    },

    onFocus() {
      this.open = true;
    },

    onBlur() {
      this.search = "";
      this.open = false;
    },

    onEscape() {
      this.$refs.search.blur();
    },

    getAutocomplete(option) {
      let optionArr = [];
      this.searchColumn === "id" && optionArr.push(option.id);
      this.searchColumn === "phone" && optionArr.push(option.phone);
      const fullName = option.name;
      optionArr.push(fullName);
      return this.styleAutocomplete(optionArr);
    },

    styleAutocomplete(optionArr) {
      let HTMLElement = "";
      optionArr.forEach(
        option => (HTMLElement += `<span class="col mx-2">${option}</span>`)
      );
      return HTMLElement;
    },

    isStringLengthValid(str) {
      const wordCount = str.split(" ").length;
      return (this.searchColumn === "name" && wordCount <= 3) || wordCount <= 1;
    }
  }
};
</script>

<style>
.dropdown {
  position: relative;
  width: 50%;
  margin: 0 auto;
}
.dropdown-input,
.dropdown-selected {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus,
.dropdown-selected:hover {
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder {
  opacity: 0.7;
}
.dropdown-selected {
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list {
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #edf2f7;
}
.dropdown-item-flag {
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
}
</style>
