import { CreateAnnouncementService, PublishAnnouncementService, AnnouncementSearchService } from './services/announcement.service';
// advertisement module entry point

export const APPLICATION_SERVICES = [
    CreateAnnouncementService,
    PublishAnnouncementService,
    AnnouncementSearchService
]