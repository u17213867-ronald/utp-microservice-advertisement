import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { INFRASTRUCTURE } from "./infrastructure";
import { APPLICATION_SERVICES } from "./application";
import { SearchModule } from "../search/search.module";

// advertisement module entry point
@Module({
  imports: [CommonModule, SearchModule],
  providers: [...APPLICATION_SERVICES, ...INFRASTRUCTURE],
  exports: [...APPLICATION_SERVICES, ...INFRASTRUCTURE],
})
export class AdvertisementModule {}
