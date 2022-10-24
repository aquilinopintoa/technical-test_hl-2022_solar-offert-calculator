import ISupplyPointRepository from "@/SupplyPoint/domain/repositories/SupplyPointRepository";

export default class SupplyPointRepositoryMock
  implements ISupplyPointRepository
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public getSupplyPointInfo: any, public getAllSupplyPoints: any) {}
}
