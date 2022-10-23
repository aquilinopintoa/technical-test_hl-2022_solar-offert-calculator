import IClientRepository from "./ClientRepository";
import ISupplyPointRepository from "./SupplyPointRepository";

export default interface Repositories {
  clientRepository: IClientRepository;
  supplyPointRepository: ISupplyPointRepository;
}
