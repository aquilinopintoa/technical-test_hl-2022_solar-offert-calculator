import { IClient } from "./Client";
import { ISupplyPoint } from "./SupplyPoint";

export interface ISolarProductDiscount {
  discount: number;
}

export interface ISupplyPointDataToSolarProduct {
  clientInfo: IClient;
  supplyPointInfo: ISupplyPoint;
  solarProductDiscount?: ISolarProductDiscount;
}
