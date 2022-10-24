<template>
  <div class="w-full">
    <div>
      <span class="font-bold mr-4">CUPS</span>
      <span>{{ supplyPointInfo.cups }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">tariff</span>
      <span>{{ supplyPointInfo.tariff }}</span>
    </div>
    <div>
      <span class="font-bold mr-4">Invoiced Amount</span>
      <span>{{ supplyPointInfo.invoicedAmount }} €</span>
    </div>
    <div>
      <span class="font-bold mr-4">Power</span>
      <span
        >{{ supplyPointInfo.power.p1 }}w - {{ supplyPointInfo.power.p2 }}w</span
      >
    </div>
    <div>
      <span class="font-bold mr-4">Neighbors</span>
      <span>{{ supplyPointInfo.neighbors.join(" - ") }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ISupplyPoint } from "@/SupplyPoint/domain/models/SupplyPoint";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    supplyPointInfo: {
      type: Object as PropType<ISupplyPoint>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
