import { AnnouncementInterface } from "../value-objects/announcement-model.interface"

export abstract class AnnouncementRepository {
  abstract create(input: any): Promise<AnnouncementInterface>
  abstract findById: (id: number) => Promise<AnnouncementInterface | null>
  abstract findAll(): Promise<AnnouncementInterface[]>
  abstract delete(id: number): Promise<void>
  abstract publishAnnouncement(input: AnnouncementInterface): Promise<AnnouncementInterface>
}