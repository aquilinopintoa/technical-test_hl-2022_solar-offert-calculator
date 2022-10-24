<template>
  <div class="flex-col p-6">
    <h3 class="text-right font-medium text-lg">Client Information</h3>
    <ClientSection :clientInfo="cupsData.clientInfo" />
  </div>
  <div class="flex-grow border-t border-gray-400"></div>
  <div class="flex-col p-6">
    <h3 class="text-right font-medium text-lg">Supply Point Information</h3>
    <SupplyPointSection :supplyPointInfo="cupsData.supplyPointInfo" />
  </div>
  <div class="flex-grow border-t border-gray-400"></div>
  <div class="flex-col p-6">
    <SolarProductDiscountSection
      v-if="cupsData.solarProductDiscount"
      :solarProductDiscount="cupsData.solarProductDiscount"
    />
    <AppAlert v-else>The client cannot contract the product.</AppAlert>
  </div>
</template>

<script lang="ts">
import AppAlert from "@/components/AppAlert.vue";
import { ISupplyPointDataToSolarProduct } from "@/SupplyPoint/domain/models/SupplyPointDataToSolarProduct";
import { defineComponent, PropType } from "vue";
import ClientSection from "./ClientSection.vue";
import SolarProductDiscountSection from "./SolarProductDiscountSection.vue";
import SupplyPointSection from "./SupplyPointSection.vue";

export default defineComponent({
  props: {
    cupsData: {
      type: Object as PropType<ISupplyPointDataToSolarProduct>,
      required: true,
    },
  },
  components: {
    ClientSection,
    SupplyPointSection,
    SolarProductDiscountSection,
    AppAlert,
  },
});
</script>

<style scoped></style>
