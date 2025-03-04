import { AnnouncementInterface } from "../value-objects/announcement-model.interface"
import { AnnouncementOutputDto } from "../value-objects/announcement-output-dto"

export abstract class AnnouncementRepository {
  abstract create(input: any): Promise<AnnouncementInterface>
  abstract findById: (id: number) => Promise<AnnouncementInterface | null>
  abstract findAll(): Promise<AnnouncementInterface[]>
  abstract delete(id: number): Promise<void>
  abstract publishAnnouncement(input: AnnouncementInterface): Promise<AnnouncementInterface>
  abstract fetchPublishedAnnouncements(id: number): Promise<AnnouncementOutputDto>
  abstract searchAnnouncements(
    filter: any,
    page: number,
    limit: number
  ): Promise<{ items: AnnouncementInterface[]; count: number }>
}