<template>
  <div class="w-full">
    <div>
      <span class="font-bold mr-4">Full Name</span>
      <span>{{ clientInfo.fullName }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">CUPS</span>
      <span>{{ clientInfo.cups }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">Address</span>
      <span>{{ clientInfo?.address }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">Building Type</span>
      <span>{{ clientInfo?.buildingType }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">Role</span>
      <span>{{ clientInfo?.role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { IClient } from "@/SupplyPoint/domain/models/Client";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    clientInfo: {
      type: Object as PropType<IClient>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
