import { Module } from '@nestjs/common'
import { UserController } from './rest/user.controller'
import { CommonModule } from '@common/common.module'
import { AdvertisementModule } from '@src/context/advertisement/advertisement.module'
import { ConfigurationModel } from "@common/infrastructure/models/configuration.model";
import { ConfigModule } from '@nestjs/config';
import { AdvertisementController } from './rest/advertisement.controller';
import { SearchModule } from '@src/context/search/search.module';
import { SearchAdvertisementController } from './rest/search.advertisement.controller';


export default () => ({
    DB_MODELS: [ConfigurationModel],
  });
@Module({
  imports: [CommonModule, AdvertisementModule, SearchModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController, AdvertisementController, SearchAdvertisementController],
  providers: [],
})
export class AppModule {}
