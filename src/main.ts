import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import ClientRepository from "./SupplyPoint/infrastructure/repositories/fromJson/ClientRepository";
import SupplyPointRepository from "./SupplyPoint/infrastructure/repositories/fromJson/SupplyPointRepository";

const repositories = {
  clientRepository: new ClientRepository(),
  supplyPointRepository: new SupplyPointRepository(),
};

createApp(App)
  .provide("repositories", repositories)
  .use(store)
  .use(router)
  .mount("#app");
