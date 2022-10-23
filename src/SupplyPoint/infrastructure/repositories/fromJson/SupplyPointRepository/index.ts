import ISupplyPointRepository from "@/SupplyPoint/domain/repositories/SupplyPointRepository";
import supplyPointsJson from "../data/supply-points.json";
import supplyPointFromJsonAdapter from "./supplyPointFromJsonAdapter";

export default class SupplyPointRepository implements ISupplyPointRepository {
  async getSupplyPointInfo(cups: string) {
    const supplyPoint = supplyPointsJson
      .map(supplyPointFromJsonAdapter)
      .find((supplyPoint) => supplyPoint.cups === cups);

    // todo :: remove this
    await new Promise((r) => setTimeout(r, 1 * 1000));

    if (!supplyPoint) {
      throw new Error("SupplyPoint.NotFound");
    }

    return supplyPoint;
  }

  // todo :: remove or add pagination
  getAllSupplyPoints() {
    const supplyPoints = supplyPointsJson.map(supplyPointFromJsonAdapter);
    return Promise.resolve(supplyPoints);
  }
}
