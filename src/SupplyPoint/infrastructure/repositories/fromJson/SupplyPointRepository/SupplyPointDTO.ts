export default interface ISupplyPointDTO {
  cups: string;
  tariff: string;
  invoiced_amount: string;
  power: {
    p1: string;
    p2: string;
  };
  neighbors: string[];
}
