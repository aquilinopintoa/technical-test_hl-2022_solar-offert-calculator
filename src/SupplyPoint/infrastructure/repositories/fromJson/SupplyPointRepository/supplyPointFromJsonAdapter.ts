import SupplyPoint from "../../../../domain/models/SupplyPoint";
import ISupplyPointDTO from "./SupplyPointDTO";

export default ({
  cups,
  neighbors,
  invoiced_amount,
  power,
  tariff,
}: ISupplyPointDTO) =>
  new SupplyPoint(
    cups,
    tariff,
    Number(invoiced_amount),
    {
      p1: Number(power.p1),
      p2: Number(power.p2),
    },
    neighbors
  );
