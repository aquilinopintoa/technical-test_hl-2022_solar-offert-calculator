export enum BUILDING_TYPES {
  HOUSE = "house",
  APARTMENT = "apartment",
}

export interface IClient {
  fullName: string;
  address: string;
  cups: string;
  role: string;
  buildingType: string;
}

export default class Client implements IClient {
  constructor(
    readonly fullName: string,
    readonly address: string,
    readonly cups: string,
    readonly role: string,
    readonly buildingType: string
  ) {}
}
