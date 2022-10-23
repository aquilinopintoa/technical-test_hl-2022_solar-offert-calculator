<template>
  <div class="flex flex-col">
    <div class="p-4 max-w-xl m-auto">
      <SearchForm @search="searchHandler" />
    </div>
    <div class="flex justify-center">
      <div v-if="cupsData" class="w-1/2">
        <SupplyPointDetailsSection
          :cupsData="cupsData"
        ></SupplyPointDetailsSection>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import SupplyPointDetailsSection from "@/views/components/SupplyPointDetailsSection.vue";
import SearchForm from "@/components/SearchForm.vue";
import getSupplyPointDataToSolarProduct from "@/SupplyPoint/domain/services/getSupplyPointDataToSolarProduct";
import { ISupplyPointDataToSolarProduct } from "@/SupplyPoint/domain/models/SupplyPointDataToSolarProduct";
import Repositories from "@/SupplyPoint/domain/repositories/Repositories";

export default defineComponent({
  components: {
    SupplyPointDetailsSection,
    SearchForm,
  },
  setup() {
    return { repositories: inject("repositories") as Repositories };
  },
  data() {
    return {
      isLoading: false,
      cupsData: null as ISupplyPointDataToSolarProduct | null,
      error: null,
    };
  },
  methods: {
    async searchHandler(searchValue: string) {
      const cups = searchValue;
      this.isLoading = true;
      this.cupsData = null;
      this.error = null;
      try {
        this.cupsData = await getSupplyPointDataToSolarProduct(
          cups,
          this.repositories
        );
      } catch (error: any) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
});
</script>
