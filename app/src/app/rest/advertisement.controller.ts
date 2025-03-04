import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateAnnouncementInput } from '../input/create-announcement.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAnnouncementService, PublishAnnouncementService } from './../../context/advertisement/application/services/announcement.service';

@ApiTags('Advertisement')
@Controller()
export class AdvertisementController {
  constructor(
    private readonly createAnnouncementService: CreateAnnouncementService,
    private readonly publishAnnouncementService: PublishAnnouncementService
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiResponse({ status: 201, description: 'The announcement has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  add(@Body() createAnnouncementInput: CreateAnnouncementInput): any {
    return this.createAnnouncementService.execute(createAnnouncementInput);
  }

  @Put(':id/publish')
  @HttpCode(200)
  @ApiOperation({ summary: 'Publish an announcement' })
  @ApiResponse({ status: 200, description: 'The announcement has been successfully published.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async publish(@Param('id') id: number): Promise<any> {
    return await this.publishAnnouncementService.execute(id);
  }
}
