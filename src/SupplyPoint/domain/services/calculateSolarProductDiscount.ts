import { ISolarProductDiscount } from "../models/SupplyPointDataToSolarProduct";
import { ISupplyPoint } from "../models/SupplyPoint";
import SupplyPointRepository from "../repositories/SupplyPointRepository";

export enum SolarProductDiscounts {
  SPECIAL = 0.12,
  BASIC = 0.05,
  STANDARD = 0,
}

export const MINIMUN_INVOICED_AMOUNT_TO_SPECIAL_DISCOUNT = 100;

const isEnabledToBasicDiscount = (
  interesedSupplyPoint: ISupplyPoint,
  neighborSupplyPoint: ISupplyPoint[]
): boolean =>
  neighborSupplyPoint.every(
    (neighbor) =>
      neighbor?.power.p1 < interesedSupplyPoint.power.p1 &&
      neighbor?.power.p2 < interesedSupplyPoint.power.p2
  );

const isEnabledToSpecialDiscount = (neighborSupplyPoint: ISupplyPoint[]) => {
  const totalNeighborsInvoicedAmount = neighborSupplyPoint.reduce(
    (acc, neighbor) => acc + (neighbor?.invoicedAmount || 0),
    0
  );

  return (
    totalNeighborsInvoicedAmount > MINIMUN_INVOICED_AMOUNT_TO_SPECIAL_DISCOUNT
  );
};

export default async (
  interesedSupplyPoint: ISupplyPoint,
  supplyPointRepository: SupplyPointRepository
): Promise<ISolarProductDiscount> => {
  const neighborsSupplyPoints = await Promise.all(
    interesedSupplyPoint.neighbors.map((neighborCPUS) =>
      supplyPointRepository.getSupplyPointInfo(neighborCPUS)
    )
  );

  if (isEnabledToSpecialDiscount(neighborsSupplyPoints)) {
    return {
      discount: SolarProductDiscounts.SPECIAL,
    };
  }

  if (isEnabledToBasicDiscount(interesedSupplyPoint, neighborsSupplyPoints)) {
    return {
      discount: SolarProductDiscounts.BASIC,
    };
  }

  return {
    discount: SolarProductDiscounts.STANDARD,
  };
};
