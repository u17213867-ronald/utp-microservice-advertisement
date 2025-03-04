import { IQueryAnnouncementInput } from '@src/context/advertisement/application/dto/create-announcement-input.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsInt,
} from 'class-validator';

export class QueryFilterAnnouncementInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  @IsOptional()
  @IsInt()
  locationId?: number;

  @IsOptional()
  @IsInt()
  areaId?: number;

  @IsOptional()
  @IsInt()
  userCompanyId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['published', 'draft'])
  publicationStatus: 'published' | 'draft';
}

export class QueryAnnouncementInput {
    @IsOptional()
    @ValidateNested()
    @Type(() => QueryFilterAnnouncementInput)
    filter?: QueryFilterAnnouncementInput;
  
    @IsOptional()
    page: number  = 1;
  
    @IsOptional()
    limit: number = 10;
  }
  
