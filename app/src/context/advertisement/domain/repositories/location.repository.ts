import { LocationInterface } from "../value-objects/location.interface";
import { UserCompanyInterface } from "../value-objects/user-compan.model.interface"

export abstract class LocacionRepository {
  abstract findById(id: number): Promise<LocationInterface | null>
}