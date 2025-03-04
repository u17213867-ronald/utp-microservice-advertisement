import { DeleteService } from "./services/advertisement/delete.service";
import { UpdateService } from "./services/advertisement/update.service";
import { SearchAdvertisementsService } from "./services/search-advertisements.service";

// search module entry point
export const ApplicationServices = [
    SearchAdvertisementsService,
    UpdateService,
    DeleteService
  ]