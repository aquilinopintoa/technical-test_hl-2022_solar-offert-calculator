import SupplyPointRepositoryMock from "@/SupplyPoint/infrastructure/repositories/mocks/SupplyPointRepositoryMock";
import SolarProductDiscounts from "../../models/SolarProductDiscounts";
import SupplyPoint from "../../models/SupplyPoint";
import calculateSolarProductDiscount from "../calculateSolarProductDiscount";

let supplyPointRepository: SupplyPointRepositoryMock;

beforeEach(() => {
  supplyPointRepository = new SupplyPointRepositoryMock(jest.fn(), jest.fn());
});

describe("Calculate SolarProduct Discount Service", () => {
  it("should return Solar Product Special discount if the sum of the neighbors invoicedAmount is greater than 100", async () => {
    const neighbors: {
      [key: string]: SupplyPoint;
    } = {
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
    const neighborsCUPS = ["234567", "345678"];
    const supplyPointData = new SupplyPoint(
      "132456",
      "tariff",
      100,
      { p1: 1000, p2: 2000 },
      neighborsCUPS
    );
    supplyPointRepository.getSupplyPointInfo.mockImplementation(
      (cups: string): SupplyPoint => neighbors[cups]
    );

    const result = await calculateSolarProductDiscount(
      supplyPointData,
      supplyPointRepository
    );

    expect(result).toEqual(SolarProductDiscounts.SPECIAL);
  });

  it("should return Solar Product Basic discount if the  neighbors powers are lower than supply point power", async () => {
    const neighbors: {
      [key: string]: SupplyPoint;
    } = {
      "234567": new SupplyPoint(
        "132456",
        "tariff",
        50,
        { p1: 500, p2: 600 },
        []
      ),
      "345678": new SupplyPoint(
        "345678",
        "tariff",
        50,
        { p1: 400, p2: 300 },
        []
      ),
    };
    const neighborsCUPS = ["234567", "345678"];
    const supplyPointData = new SupplyPoint(
      "132456",
      "tariff",
      100,
      { p1: 1000, p2: 2000 },
      neighborsCUPS
    );
    supplyPointRepository.getSupplyPointInfo.mockImplementation(
      (cups: string): SupplyPoint => neighbors[cups]
    );

    const result = await calculateSolarProductDiscount(
      supplyPointData,
      supplyPointRepository
    );

    expect(result).toEqual(SolarProductDiscounts.BASIC);
  });

  it("should return Solar Product Standard discount if the  neighbors powers are greater than supply point power and the sum of the neighbors invoicedAmount is lower than 100", async () => {
    const neighbors: {
      [key: string]: SupplyPoint;
    } = {
      "234567": new SupplyPoint(
        "132456",
        "tariff",
        50,
        { p1: 500, p2: 600 },
        []
      ),
      "345678": new SupplyPoint(
        "345678",
        "tariff",
        50,
        { p1: 400, p2: 300 },
        []
      ),
    };
    const neighborsCUPS = ["234567", "345678"];
    const supplyPointData = new SupplyPoint(
      "132456",
      "tariff",
      100,
      { p1: 10, p2: 20 },
      neighborsCUPS
    );
    supplyPointRepository.getSupplyPointInfo.mockImplementation(
      (cups: string): SupplyPoint => neighbors[cups]
    );

    const result = await calculateSolarProductDiscount(
      supplyPointData,
      supplyPointRepository
    );

    expect(result).toEqual(SolarProductDiscounts.STANDARD);
  });
});
