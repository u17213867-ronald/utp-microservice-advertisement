import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CreateAnnouncementInput, PublishAnnouncementInput } from '../input/create-announcement.input'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateAnnouncementService, PublishAnnouncementService } from './../../context/advertisement/application/services/announcement.service'

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
  add(@Body() request: CreateAnnouncementInput): any {
    return this.createAnnouncementService.execute(request)
  }


  @Put(':id/publish')
  @HttpCode(200)
  @ApiOperation({ summary: 'publish a new announcement' })
  @ApiResponse({ status: 201, description: 'The announcement has been successfully publish.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async publish(@Param('id') id: number): Promise<any> {
    return await this.publishAnnouncementService.execute(id)
  }
}
