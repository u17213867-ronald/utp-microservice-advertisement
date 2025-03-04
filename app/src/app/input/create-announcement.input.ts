import { IsString, IsNotEmpty, IsEnum, IsInt, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAnnouncementDto } from './../../context/advertisement/application/dto/create-announcement-input.dto';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

enum PublicationStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft'
}

class PositionInput {
  @ApiProperty({ example: 2, description: 'ID of the position.' })
  @IsInt()
  positionId: number;

  @ApiProperty({ example: 4, description: 'ID of the specialty.', required: false })
  @IsOptional()
  @IsInt()
  specialtyId?: number;

  @ApiProperty({ example: 1, description: 'ID of the position level.', required: false })
  @IsOptional()
  @IsInt()
  positionLevelId?: number;

  @ApiProperty({ example: 3, description: 'ID of the social network.', required: false })
  @IsOptional()
  @IsInt()
  socialNetworkId?: number;

  @ApiProperty({ example: '3 years of experience in web development.', required: false })
  @IsOptional()
  @IsString()
  experienceRequired?: string;
}

class StudyInput {

  @ApiProperty({ example: 5, description: 'ID of the institution.', required: false })
  @IsOptional()
  @IsInt()
  institutionId?: number;

  @ApiProperty({ example: 2, description: 'ID of the degree.', required: false })
  @IsOptional()
  @IsInt()
  degreeId?: number;

  @ApiProperty({ example: 3, description: 'ID of the education level.', required: false })
  @IsOptional()
  @IsInt()
  educationLevelId?: number;

  @ApiProperty({ example: 7, description: 'ID of the skill.', required: false })
  @IsOptional()
  @IsInt()
  skillId?: number;
}

export class CreateAnnouncementInput implements CreateAnnouncementDto {
  @ApiProperty({ example: 'Desarrollador Full Stack', description: 'Title of the announcement.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'We are looking for a Full Stack developer.', description: 'Description of the announcement.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: Status, example: Status.ACTIVE, description: 'Status of the announcement.' })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: 1, description: 'ID of the location.', required: false })
  @IsOptional()
  @IsInt()
  locationId?: number;


  @ApiProperty({ example: 1, description: 'ID of the area.', required: false })
  @IsOptional()
  @IsInt()
  areaId?: number;

  @ApiProperty({ example: 3, description: 'ID of the user company.', required: false })
  @IsOptional()
  @IsInt()
  userCompanyId?: number;

  @ApiProperty({ enum: PublicationStatus, example: PublicationStatus.PUBLISHED, description: 'Publication status of the announcement.' })
  @IsEnum(PublicationStatus)
  publicationStatus: PublicationStatus;

  @ApiProperty({ type: [PositionInput], description: 'List of related positions.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionInput)
  positions: PositionInput[];

  @ApiProperty({ type: [StudyInput], description: 'List of required studies.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudyInput)
  studies: StudyInput[];
}

  
export class PublishAnnouncementInput {
  @ApiProperty({
      description: 'The advertisementId',
      required: true,
      type: 'number',
      example: ''
    })
  id:number;
}