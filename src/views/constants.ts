import { Errors } from "@/SupplyPoint/domain/models/Errors";

export const ERROR_MESSAGES = {
  [Errors.CLIENT_NOT_FOUND]: "Client not found",
  [Errors.SUPPLY_POINT_NOT_FOUND]: "Supply point not found",
  [Errors.UNEXPECTED_ERROR]: "Unexpected error",
};
