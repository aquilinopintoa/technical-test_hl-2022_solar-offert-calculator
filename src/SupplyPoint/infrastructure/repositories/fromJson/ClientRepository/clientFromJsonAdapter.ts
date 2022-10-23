import Client from "../../../../domain/models/Client";
import IClientDTO from "./ClientDTO";

export default ({
  full_name,
  address,
  cups,
  role,
  building_type,
}: IClientDTO): Client =>
  new Client(full_name, address, cups, role, building_type);
