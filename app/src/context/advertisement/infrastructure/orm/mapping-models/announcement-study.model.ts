import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { AnnouncementModel } from './announcement.model';

@Table({ tableName: 'announcement_study' })
export class AnnouncementStudyModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => AnnouncementModel)
  @Column({ field: 'announcement_id', type: DataType.INTEGER, allowNull: false })
  announcementId: number;

  @Column({ field: 'institution_id', type: DataType.INTEGER, allowNull: true })
  institutionId: number;

  @Column({ field: 'degree_id', type: DataType.INTEGER, allowNull: true })
  degreeId: number;

  @Column({ field: 'educationLevel_id', type: DataType.INTEGER, allowNull: true })
  educationLevelId: number;

  @Column({ field: 'skill_id', type: DataType.INTEGER, allowNull: true })
  skillId: number;
}
