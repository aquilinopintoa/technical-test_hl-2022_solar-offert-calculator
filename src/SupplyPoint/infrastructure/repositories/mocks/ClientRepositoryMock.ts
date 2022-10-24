import IClientRepository from "@/SupplyPoint/domain/repositories/ClientRepository";

export default class ClientRepositoryMock implements IClientRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public getClientInfo: any, public getAllClients: any) {}
}
