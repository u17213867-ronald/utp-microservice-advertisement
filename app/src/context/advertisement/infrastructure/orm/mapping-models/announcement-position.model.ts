import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { AnnouncementModel } from './announcement.model';

@Table({ tableName: 'announcement_position' })
export class AnnouncementPositionModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => AnnouncementModel)
  @Column({ field: 'announcement_id', type: DataType.INTEGER, allowNull: false })
  announcementId: number;

  @Column({ field: 'position_id', type: DataType.INTEGER, allowNull: false })
  positionId: number;

  @Column({ field: 'specialty_id', type: DataType.INTEGER, allowNull: true })
  specialtyId: number;

  @Column({ field: 'positionLevel_id', type: DataType.INTEGER, allowNull: true })
  positionLevelId: number;

  @Column({ field: 'socialNetwork_id', type: DataType.INTEGER, allowNull: true })
  socialNetworkId: number;

  @Column({ field: 'experienceRequired', type: DataType.STRING, allowNull: true })
  experienceRequired: string;
}
