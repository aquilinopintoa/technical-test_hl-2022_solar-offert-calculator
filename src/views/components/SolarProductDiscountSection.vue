<template>
  <div class="text-center">
    <span>Discount Type</span>
    <div class="pt-2">
      <span class="mr-5 font-medium">{{ solarProductDiscount.type }}</span>
      <span>{{ discount }} %</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ISolarProductDiscount } from "@/SupplyPoint/domain/models/SupplyPointDataToSolarProduct";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    solarProductDiscount: {
      type: Object as PropType<ISolarProductDiscount>,
      required: true,
    },
  },
  setup(props) {
    return {
      discount: props.solarProductDiscount.discount * 100,
    };
  },
});
</script>

<style scoped></style>
