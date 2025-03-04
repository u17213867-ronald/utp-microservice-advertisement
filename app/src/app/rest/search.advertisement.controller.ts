import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnnouncementSearchService } from './../../context/advertisement/application/services/announcement.service';
import { QueryAnnouncementInput } from '../input/query-announcement.input';
import { IQueryAnnouncementInput } from '@src/context/advertisement/application/dto/create-announcement-input.dto';

@ApiTags('SearchAdvertisementController')
@Controller()
export class SearchAdvertisementController {
  constructor(
    private readonly searchAnnouncementService: AnnouncementSearchService
  ) {}

  @Get('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiResponse({ status: 201, description: 'The announcement has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  findAll(@Query() input: QueryAnnouncementInput): any {
    return this.searchAnnouncementService.execute(input as IQueryAnnouncementInput);
  }

}
