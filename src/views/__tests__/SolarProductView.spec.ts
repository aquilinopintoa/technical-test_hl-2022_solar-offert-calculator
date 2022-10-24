import AppLoading from "@/components/AppLoading.vue";
import SearchForm from "@/components/SearchForm.vue";
import Client from "@/SupplyPoint/domain/models/Client";
import SupplyPoint from "@/SupplyPoint/domain/models/SupplyPoint";
import ClientRepositoryMock from "@/SupplyPoint/infrastructure/repositories/mocks/ClientRepositoryMock";
import SupplyPointRepositoryMock from "@/SupplyPoint/infrastructure/repositories/mocks/SupplyPointRepositoryMock";
import { shallowMount } from "@vue/test-utils";

import SolarProductView from "../SolarProductView.vue";

let supplyPointRepository: SupplyPointRepositoryMock;
let clientRepository: ClientRepositoryMock;

beforeEach(() => {
  supplyPointRepository = new SupplyPointRepositoryMock(jest.fn(), jest.fn());
  clientRepository = new ClientRepositoryMock(jest.fn(), jest.fn());
});

describe("Solar Product View", () => {
  it("should render loading while load client data", async () => {
    const clientCUPS = "123456";
    const neighborsCUPS = ["234567", "345678"];
    const clientData = new Client(
      "name",
      "address",
      clientCUPS,
      "role",
      "house"
    );
    const supplyPoints: {
      [key: string]: SupplyPoint;
    } = {
      "123456": new SupplyPoint(
        "132456",
        "tariff",
        100,
        { p1: 1000, p2: 2000 },
        neighborsCUPS
      ),
      "234567": new SupplyPoint(
        "132456",
        "tariff",
        50,
        { p1: 1000, p2: 2000 },
        []
      ),
      "345678": new SupplyPoint(
        "345678",
        "tariff",
        60,
        { p1: 1000, p2: 2000 },
        []
      ),
    };
    clientRepository.getClientInfo.mockResolvedValue(clientData);
    supplyPointRepository.getSupplyPointInfo.mockImplementation(
      (cups: string): SupplyPoint => supplyPoints[cups]
    );

    const wrapper = shallowMount(SolarProductView, {
      global: {
        provide: {
          repositories: { clientRepository, supplyPointRepository },
        },
      },
    });

    await wrapper.findComponent(SearchForm).vm.$emit("search", clientCUPS);

    expect(wrapper.findComponent(AppLoading)).toBeDefined();
  });
});
