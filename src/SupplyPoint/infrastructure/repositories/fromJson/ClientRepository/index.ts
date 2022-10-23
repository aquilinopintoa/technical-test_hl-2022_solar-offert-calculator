import clientsJson from "../data/clients.json";
import IClientRepository from "../../../../domain/repositories/ClientRepository";

import clientFromJsonAdapter from "./clientFromJsonAdapter";

export default class ClientRepository implements IClientRepository {
  async getClientInfo(cups: string) {
    const client = clientsJson
      .map(clientFromJsonAdapter)
      .find((client) => client.cups === cups);

    // todo :: remove this
    await new Promise((r) => setTimeout(r, 1 * 1000));

    if (!client) {
      throw new Error("Client.NotFound");
    }

    return client;
  }

  // todo :: remove or add pagination
  getAllClients() {
    const clients = clientsJson.map(clientFromJsonAdapter);

    return Promise.resolve(clients);
  }
}
