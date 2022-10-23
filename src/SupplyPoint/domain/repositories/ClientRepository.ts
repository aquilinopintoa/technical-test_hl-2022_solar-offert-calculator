import { IClient } from "../models/Client";

export default interface IClientRepository {
  getAllClients: () => Promise<IClient[]>;
  getClientInfo: (cpus: string) => Promise<IClient>;
}
