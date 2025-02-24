import { RedisService } from './../../common/infrastructure/services/redis.service';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './../../common/infrastructure/services/config.service';
import { AnnouncementRepository } from "../domain/repositories/announcement-repository"
import { AnnouncementMysqlRepository } from "./repositories/announcement.mysql.repository"
import { UserCompanyMysqlRepository } from './repositories/user-company.mysql.repository';
import { UserCompanyRepository } from '../domain/repositories/user-company.repository';
import { LocationMysqlRepository } from './repositories/location.msysql.repository';
import { LocacionRepository } from '../domain/repositories/location.repository';

export const ADVERTISEMENT_REPOSITORY_PROVIDER = {
  inject: ['SEQUELIZE', 'REDIS', ConfigService],
  provide: AnnouncementRepository,
  useFactory: async (sequelize: Sequelize, redisService: RedisService, configService: ConfigService) => {
    return new AnnouncementMysqlRepository(sequelize, redisService, configService)
  },
}

export const USER_COMPANY_REPOSITORY_PROVIDER = {
  inject: ['SEQUELIZE'],
  provide: UserCompanyRepository,
  useFactory: async (sequelize: Sequelize) => {
    return new UserCompanyMysqlRepository(sequelize)
  },
}

export const LOCATION_REPOSITORY_PROVIDER = {
  inject: ['SEQUELIZE'],
  provide: LocacionRepository,
  useFactory: async (sequelize: Sequelize) => {
    return new LocationMysqlRepository(sequelize)
  },
}

export const INFRASTRUCTURE = [ADVERTISEMENT_REPOSITORY_PROVIDER, USER_COMPANY_REPOSITORY_PROVIDER, LOCATION_REPOSITORY_PROVIDER]
