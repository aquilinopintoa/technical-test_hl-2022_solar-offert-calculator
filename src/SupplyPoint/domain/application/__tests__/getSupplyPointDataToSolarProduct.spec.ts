import ClientRepositoryMock from "@/SupplyPoint/infrastructure/repositories/mocks/ClientRepositoryMock";
import SupplyPointRepositoryMock from "@/SupplyPoint/infrastructure/repositories/mocks/SupplyPointRepositoryMock";
import Client from "../../models/Client";
import SolarProductDiscounts from "../../models/SolarProductDiscounts";
import SupplyPoint from "../../models/SupplyPoint";
import getSupplyPointDataToSolarProduct from "../getSupplyPointDataToSolarProduct";

let supplyPointRepository: SupplyPointRepositoryMock;
let clientRepository: ClientRepositoryMock;

beforeEach(() => {
  supplyPointRepository = new SupplyPointRepositoryMock(jest.fn(), jest.fn());
  clientRepository = new ClientRepositoryMock(jest.fn(), jest.fn());
});

describe("Get Supply Point Data to Solar Product", () => {
  describe("should return only Client and supply data", () => {
    it(" if Client has a different buildingType of house", async () => {
      const clientCUPS = "123456";
      const clientData = new Client(
        "name",
        "address",
        clientCUPS,
        "role",
        "apartment"
      );
      const clientSupplyPoint = new SupplyPoint(
        clientCUPS,
        "tariff",
        100,
        { p1: 1000, p2: 2000 },
        []
      );
      clientRepository.getClientInfo.mockResolvedValue(clientData);
      supplyPointRepository.getSupplyPointInfo.mockResolvedValue(
        clientSupplyPoint
      );

      const result = await getSupplyPointDataToSolarProduct(clientCUPS, {
        supplyPointRepository,
        clientRepository,
      });

      expect(result).toEqual({
        clientInfo: clientData,
        supplyPointInfo: clientSupplyPoint,
      });
    });

    it(" if Client has no neighbors", async () => {
      const clientCUPS = "123456";
      const clientData = new Client(
        "name",
        "address",
        clientCUPS,
        "role",
        "house"
      );
      const clientSupplyPoint = new SupplyPoint(
        clientCUPS,
        "tariff",
        100,
        { p1: 1000, p2: 2000 },
        []
      );
      clientRepository.getClientInfo.mockResolvedValue(clientData);
      supplyPointRepository.getSupplyPointInfo.mockResolvedValue(
        clientSupplyPoint
      );

      const result = await getSupplyPointDataToSolarProduct(clientCUPS, {
        supplyPointRepository,
        clientRepository,
      });

      expect(result).toEqual({
        clientInfo: clientData,
        supplyPointInfo: clientSupplyPoint,
      });
    });
  });

  describe("should return Client, supply point and available discount", () => {
    it("should special discount if the sum of the neighbors invoicedAmount is greater than 100", async () => {
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

      const result = await getSupplyPointDataToSolarProduct(clientCUPS, {
        supplyPointRepository,
        clientRepository,
      });

      expect(result).toEqual({
        clientInfo: clientData,
        supplyPointInfo: supplyPoints[clientCUPS],
        solarProductDiscount: SolarProductDiscounts.SPECIAL,
      });
    });
  });
});
