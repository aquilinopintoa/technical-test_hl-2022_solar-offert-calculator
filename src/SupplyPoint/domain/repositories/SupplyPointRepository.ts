import { ISupplyPoint } from "../models/SupplyPoint";

export default interface ISupplyPointRepository {
  getAllSupplyPoints: () => Promise<ISupplyPoint[]>;
  getSupplyPointInfo: (cpus: string) => Promise<ISupplyPoint>;
}
