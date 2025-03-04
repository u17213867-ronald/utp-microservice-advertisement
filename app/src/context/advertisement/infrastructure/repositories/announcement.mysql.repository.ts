import { AnnouncementPositionModel } from './../orm/mapping-models/announcement-position.model';
import { RedisService } from '@common/infrastructure/services/redis.service'
import { ConfigService } from '@common/infrastructure/services/config.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Sequelize, Repository } from 'sequelize-typescript'
import { AnnouncementModel } from '../orm/mapping-models/announcement.model'
import { AnnouncementStudyModel } from '../orm/mapping-models/announcement-study.model'
import { AnnouncementInterface, AnnouncementOutputInterface } from '../../domain/value-objects/announcement-model.interface';
import { AnnouncementRepository } from '../../domain/repositories/announcement-repository';
import { CustomException } from './../../../common/infrastructure/exceptions/custom.exception';
import { Op, QueryTypes } from 'sequelize';
import { AnnouncementOutputDto } from '../../domain/value-objects/announcement-output-dto';


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
          areaId: input.areaId,
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
      console.log(error)
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
        { 
          publicationStatus: announcement.publicationStatus,
          publicationDate: announcement.publicationDate
        },
        { where: { id:announcement.id }, transaction }
      );      
      await transaction.commit();
      return announcement as AnnouncementInterface;
    } catch (error) {
      await transaction.rollback();
      throw new CustomException(`Error updating announcement: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async fetchPublishedAnnouncements(id: number): Promise<AnnouncementOutputDto> {
    const query = `
      SELECT 
          a.id AS id,
          a.title AS title,
          a.description AS description,
          a.company AS company,
          a.company_slug AS companySlug,
          a.publication_date AS publicationDate,
          a.publication_status AS publicationStatus,
          ar.id AS areaId,
          ar.name AS areaName,
          ar.slug AS areaSlug,
          GROUP_CONCAT(
              CONCAT(
                  ps.id, '||',
                  CONCAT(UPPER(LEFT(ps.name, 1)), LOWER(SUBSTRING(ps.name, 2))), '||',
                  ps.slug, '|-|',
                  sp.id, '||',
                  CONCAT(UPPER(LEFT(sp.name, 1)), LOWER(SUBSTRING(sp.name, 2))), '||',
                  sp.slug, '|-|',
                  pl.id, '||',
                  CONCAT(UPPER(LEFT(pl.name, 1)), LOWER(SUBSTRING(pl.name, 2))), '||',
                  pl.slug, '|-|',
                  ap.experience_required
              )
              SEPARATOR '|--|'
          ) AS announcementPosition,
          GROUP_CONCAT(
              CONCAT(
                  i.id, '||',
                  CONCAT(UPPER(LEFT(i.name, 1)), LOWER(SUBSTRING(i.name, 2))), '||',
                  ps.slug, '|-|',
                  ast.degree_id, '||',
                  CONCAT(UPPER(LEFT(d.name, 1)), LOWER(SUBSTRING(d.name, 2))), '||',
                  d.slug, '|-|',
                  el.id, '||',
                  CONCAT(UPPER(LEFT(el.name, 1)), LOWER(SUBSTRING(el.name, 2))), '||',
                  el.parent, '|-|',
                  sk.id, '||',
                  CONCAT(UPPER(LEFT(sk.name, 1)), LOWER(SUBSTRING(sk.name, 2))), '||',
                  sk.slug
              )
              SEPARATOR '|--|'
          ) AS announcementStudy
      FROM
          announcement a
      LEFT JOIN area ar ON a.area_id = ar.id
      LEFT JOIN announcement_position ap ON a.id = ap.announcement_id
      LEFT JOIN position ps ON ap.position_id = ps.id
      LEFT JOIN specialty sp ON ap.specialty_id = sp.id
      LEFT JOIN position_level pl ON ap.position_level_id = pl.id
      LEFT JOIN announcement_study ast ON a.id = ast.announcement_id
      LEFT JOIN institution i ON ast.institution_id = i.id
      LEFT JOIN degree d ON ast.degree_id = d.id
      LEFT JOIN education_level el ON ast.education_level_id = el.id
      LEFT JOIN skills sk ON ast.skill_id = sk.id
      WHERE a.id = :id 
      GROUP BY a.id, a.title, a.description, a.company, a.company_slug, a.publication_date, a.publication_status, ar.id, ar.name, ar.slug;
    `;

    try {
      const response: AnnouncementOutputInterface[] = await this.sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });
      return new AnnouncementOutputDto(response.length ? response[0] : null)
    } catch (error) {
      throw new CustomException(`Error executing query: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchAnnouncements(
    filter: any,
    page: number = 1,
    limit: number = 10
  ): Promise<{ items: AnnouncementInterface[]; count: number }> {
    const whereClause: any = {
      publicationStatus: 'published'
    };
    console.log(filter)
    if (filter != undefined) {
      // Si se filtra por título, se busca de forma parcial (LIKE)
      if (filter.title) {
        whereClause.title = { [Op.like]: `%${filter.title}%` };
      }
      // Filtrar por estado ('active' o 'inactive')
      if (filter.status != undefined) {
        whereClause.status = filter.status;
      }
      // Filtrar por estado de publicación ('published' o 'draft')
      if (filter.publicationStatus != undefined) {
        whereClause.publicationStatus = filter.publicationStatus;
      }
      // Filtrar por área (areaId)
      if (filter.areaId != undefined) {
        whereClause.areaId = filter.areaId;
      }
    }


    const offset = (page - 1) * limit;

    try {
      const { rows, count } = await this.announcement.findAndCountAll({
        where: whereClause,
        include: [AnnouncementPositionModel, AnnouncementStudyModel],
        limit,
        offset
      });
      return { items: rows as AnnouncementInterface[], count };
    } catch (error) {
      throw new CustomException(`Error executing search: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
