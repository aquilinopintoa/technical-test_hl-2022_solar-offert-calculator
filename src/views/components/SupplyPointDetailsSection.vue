<template>
  <div class="flex-col p-6">
    <div>
      <span class="font-bold mr-4">Full Name:</span>
      <span>{{ cupsData.clientInfo.fullName }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">cups</span>
      <span>{{ cupsData.supplyPointInfo.cups }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">Discount</span>
      <span>{{ cupsData.solarProductDiscount?.discount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ISupplyPointDataToSolarProduct } from "@/SupplyPoint/domain/models/SupplyPointDataToSolarProduct";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    cupsData: {
      type: Object as PropType<ISupplyPointDataToSolarProduct>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
