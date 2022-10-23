export interface IPower {
  p1: number;
  p2: number;
}

export interface ISupplyPoint {
  cups: string;
  tariff: string;
  invoicedAmount: number;
  power: IPower;
  neighbors: string[];
}

export default class SupplyPoint implements ISupplyPoint {
  constructor(
    readonly cups: string,
    readonly tariff: string,
    readonly invoicedAmount: number,
    readonly power: IPower,
    readonly neighbors: string[]
  ) {}
}
