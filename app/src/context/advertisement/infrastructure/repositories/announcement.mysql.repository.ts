import { AnnouncementPositionModel } from './../orm/mapping-models/announcement-position.model';
import { RedisService } from './../../../common/infrastructure/services/redis.service'
import { ConfigService } from './../../../common/infrastructure/services/config.service'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Sequelize, Repository } from 'sequelize-typescript'
import { AnnouncementModel } from '../orm/mapping-models/announcement.model'
import { AnnouncementStudyModel } from '../orm/mapping-models/announcement-study.model'
import { AnnouncementInterface } from '../../domain/value-objects/announcement-model.interface';
import { AnnouncementRepository } from '../../domain/repositories/announcement-repository';
import { CustomException } from './../../../common/infrastructure/exceptions/custom.exception';


@Injectable()
export class AnnouncementMysqlRepository implements AnnouncementRepository{
  announcement: Repository<AnnouncementModel>
  announcementPosition: Repository<AnnouncementPositionModel>
  announcementStudy: Repository<AnnouncementStudyModel>
  constructor(
    private readonly sequelize: Sequelize,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
        this.sequelize.addModels([AnnouncementModel, AnnouncementPositionModel, AnnouncementStudyModel])
        this.announcement = this.sequelize.getRepository(AnnouncementModel)
        this.announcementPosition = this.sequelize.getRepository(AnnouncementPositionModel)
        this.announcementStudy = this.sequelize.getRepository(AnnouncementStudyModel)
  }

  async create(input: any): Promise<AnnouncementInterface> {
    const transaction = await this.sequelize.transaction()

    try {

      const announcement = await this.announcement.create(
        {
          title: input.title,
          description: input.description,
          status: input.status,
          locationId: input.locationId,
          userCompanyId: input.userCompanyId,
          publicationStatus: input.publicationStatus
        },
        { transaction }
      )

      if (input.positions?.length) {
        await this.announcementPosition.bulkCreate(
          input.positions.map((position) => ({
            announcementId: announcement.id,
            positionId: position.positionId,
            specialtyId: position.specialtyId,
            positionLevelId: position.positionLevelId,
            socialNetworkId: position.socialNetworkId,
            experienceRequired: position.experienceRequired
          })),
          { transaction }
        )
      }

      if (input.studies?.length) {
        await this.announcementStudy.bulkCreate(
          input.studies.map((study) => ({
            announcementId: announcement.id,
            institutionId: study.institutionId,
            degreeId: study.degreeId,
            educationLevelId: study.educationLevelId,
            skillId: study.skillId
          })),
          { transaction }
        )
      }

      await transaction.commit()
      return announcement as AnnouncementInterface
    } catch (error) {
      await transaction.rollback();
      throw new CustomException(`Error en algun campo de positions o studies`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<AnnouncementInterface[]> {
    const response = await this.announcement.findAll({
      include: [AnnouncementPositionModel, AnnouncementStudyModel]
    })

    return response as AnnouncementInterface[]
  }

  async findById(id: number): Promise<AnnouncementInterface | null> {
    const response = this.announcement.findOne({
      where: { id }
    })
    return response as unknown as AnnouncementInterface
  }

  async delete(id: number): Promise<void> {
    const transaction = await this.sequelize.transaction()

    try {
      await this.announcementPosition.destroy({ where: { announcementId: id }, transaction })
      await this.announcementStudy.destroy({ where: { announcementId: id }, transaction })
      await this.announcement.destroy({ where: { id }, transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new Error(`Failed to delete announcement: ${error.message}`)
    }
  }

  async publishAnnouncement(announcement: AnnouncementInterface): Promise<AnnouncementInterface> {
    const transaction = await this.sequelize.transaction();
  
    try {     
      await this.announcement.update(
        { publicationStatus: announcement.publicationStatus },
        { where: { id:announcement.id }, transaction }
      );      
      await transaction.commit();
      return announcement as AnnouncementInterface;
    } catch (error) {
      await transaction.rollback();
      throw new CustomException(`Error updating announcement: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  
}
