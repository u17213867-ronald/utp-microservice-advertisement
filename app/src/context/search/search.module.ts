// search module entry point
import { Module } from '@nestjs/common'
import { Logger } from '@common/application/services/logger.service'
import { Infrastructure } from '@search/infrastructure'
import { ApplicationServices } from '@search/application'
import { CommonModule } from '@common/common.module'

@Module({
  imports: [CommonModule],
  providers: [Logger, ...Infrastructure, ...ApplicationServices],
  exports: [Logger, ...Infrastructure, ...ApplicationServices],
})
export class SearchModule {}
