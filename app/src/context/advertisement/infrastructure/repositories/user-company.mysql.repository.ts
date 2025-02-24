import { Injectable } from '@nestjs/common';
import { Sequelize, Repository } from 'sequelize-typescript';
import { UserCompanyInterface } from '../../domain/value-objects/user-compan.model.interface';
import { UserCompanyRepository } from '../../domain/repositories/user-company.repository';
import { UserCompanyModel } from '../orm/mapping-models/user-company.model';

@Injectable()
export class UserCompanyMysqlRepository implements UserCompanyRepository{
  private repository: Repository<UserCompanyModel>;

  constructor(private readonly sequelize: Sequelize) {
    this.repository = this.sequelize.getRepository(UserCompanyModel);
  }

  async create(data: Partial<UserCompanyModel>): Promise<UserCompanyInterface> {
    return await this.repository.create(data);
  }

  async findById(id: number): Promise<UserCompanyInterface | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<UserCompanyInterface[]> {
    return await this.repository.findAll();
  }
}
