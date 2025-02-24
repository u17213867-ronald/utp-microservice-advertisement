import { UserCompanyInterface } from "../value-objects/user-compan.model.interface";

export abstract class UserCompanyRepository {
  abstract create(data: Partial<UserCompanyInterface>): Promise<UserCompanyInterface>;
  abstract findById(id: number): Promise<UserCompanyInterface | null>;
  abstract findAll(): Promise<UserCompanyInterface[]>;
}
