import { BUILDING_TYPES } from "../models/Client";
import { ISupplyPointDataToSolarProduct } from "../models/SupplyPointDataToSolarProduct";
import Repositories from "../repositories/Repositories";
import calculateSolarProductDiscount from "../services/calculateSolarProductDiscount";

export default async (
  cups: string,
  { clientRepository, supplyPointRepository }: Repositories
): Promise<ISupplyPointDataToSolarProduct> => {
  const clientInfo = await clientRepository.getClientInfo(cups);
  const supplyPointInfo = await supplyPointRepository.getSupplyPointInfo(cups);

  const canRolledInSolarProduct =
    clientInfo?.buildingType === BUILDING_TYPES.HOUSE &&
    supplyPointInfo?.neighbors.length;

  if (!canRolledInSolarProduct) {
    return {
      clientInfo,
      supplyPointInfo,
    };
  }
  const solarProductDiscount = await calculateSolarProductDiscount(
    supplyPointInfo,
    supplyPointRepository
  );

  return {
    clientInfo,
    supplyPointInfo,
    solarProductDiscount,
  };
};
