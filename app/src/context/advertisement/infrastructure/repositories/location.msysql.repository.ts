import { Injectable } from '@nestjs/common';
import { Sequelize, Repository } from 'sequelize-typescript';
import { LocationModel } from '../orm/mapping-models/location.model';
import { LocationInterface } from '../../domain/value-objects/location.interface';
import { LocacionRepository } from '../../domain/repositories/location.repository';

@Injectable()
export class LocationMysqlRepository implements LocacionRepository {
  private repository: Repository<LocationModel>;

  constructor(private readonly sequelize: Sequelize) {
    this.sequelize.addModels([LocationModel]);
    this.repository = this.sequelize.getRepository(LocationModel);
  }

  async findById(id: number): Promise<LocationInterface | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
