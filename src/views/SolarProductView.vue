<template>
  <div>
    <pre>{{ clientJson }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import clientJson from "../data/clients.json";

export default defineComponent({
  setup() {
    return { clientJson };
  },
});
</script>

<style scoped></style>
