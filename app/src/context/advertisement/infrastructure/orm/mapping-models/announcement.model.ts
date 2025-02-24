import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { AnnouncementPositionModel } from './announcement-position.model';
import { AnnouncementStudyModel } from './announcement-study.model';

@Table({ tableName: 'announcement' })
export class AnnouncementModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.ENUM('active', 'inactive'), defaultValue: 'active' })
  status: string = 'active';

  @Column({ field: 'location_id', type: DataType.INTEGER, allowNull: true })
  locationId: number;

  @Column({ field: 'user_company_id', type: DataType.INTEGER, allowNull: true })
  userCompanyId: number;

  @Column({ field: 'publication_status',  type: DataType.ENUM('published', 'draft'), defaultValue: 'draft' })
  publicationStatus: string;

  @HasMany(() => AnnouncementPositionModel)
  positions: AnnouncementPositionModel[];

  @HasMany(() => AnnouncementStudyModel)
  studies: AnnouncementStudyModel[];
}
