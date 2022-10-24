<template>
  <form @submit.prevent="searchHandler">
    <div class="flex">
      <input
        type="text"
        id="search_value"
        v-model="value"
        class="bg-gray-50 border mr-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="placeholder"
        required
      />

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="submit"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: String,
  },
  data() {
    return { value: "" };
  },
  methods: {
    searchHandler() {
      this.$emit("search", this.value);
    },
  },
});
</script>

<style scoped></style>
