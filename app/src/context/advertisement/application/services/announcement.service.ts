import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateAnnouncementDto, IQueryAnnouncementInput } from '@src/context/advertisement/application/dto/create-announcement-input.dto';
import { AnnouncementRepository } from './../../domain/repositories/announcement-repository';
import { CustomException } from './../../../common/infrastructure/exceptions/custom.exception';
import { UserCompanyRepository } from '../../domain/repositories/user-company.repository';
import { ResponseDto } from '../dto/response.dto';
import { LocacionRepository } from '../../domain/repositories/location.repository';
import { UpdateService } from '@search/application/services/advertisement/update.service';

@Injectable()
export class CreateAnnouncementService {
    constructor(
      private readonly announcementRepository: AnnouncementRepository,
      private readonly userCompanyRepository: UserCompanyRepository,
      private readonly locationRepository: LocacionRepository
    ) {}
  
    async execute(input: CreateAnnouncementDto): Promise<ResponseDto> {
        const userCompany = await this.userCompanyRepository.findById(input.userCompanyId)
        if (!userCompany) {
          throw new CustomException(`El Usuario Empresa con id ${input.userCompanyId} no encontrado`, HttpStatus.BAD_REQUEST)
        }

        const location = await this.locationRepository.findById(input.locationId)
        if (!location) {
          throw new CustomException(`La ubicacion con el id ${input.locationId} no encontrado`, HttpStatus.BAD_REQUEST)
        }
        console.log('input: ',input)
        return new ResponseDto(await this.announcementRepository.create(input))
    }
}

@Injectable()
export class PublishAnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
    private readonly searchRepository: UpdateService
  ) {}

  async execute(advertisementId:number): Promise<ResponseDto> {
      const announcementRepository = await this.announcementRepository.findById(Number(advertisementId))
      if (!announcementRepository) {
        throw new CustomException(`El advertisementId: ${advertisementId} no encontrado`, HttpStatus.BAD_REQUEST)
      }
      announcementRepository.publicationStatus = 'published'
      announcementRepository.publicationDate = new Date()
      await this.announcementRepository.publishAnnouncement(announcementRepository)
      // const search = await this.announcementRepository.fetchPublishedAnnouncements(Number(announcementRepository.id))
      // await this.searchRepository.execute([search])
      return new ResponseDto(true)
  }
}

@Injectable()
export class AnnouncementSearchService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository
  ) {}

  async execute(input:IQueryAnnouncementInput): Promise<ResponseDto> {
      const announcementRepository = await this.announcementRepository.searchAnnouncements(
        input.filter,
        Number(input.page),
        Number(input.limit)
      )
      return new ResponseDto(announcementRepository)
  }
}