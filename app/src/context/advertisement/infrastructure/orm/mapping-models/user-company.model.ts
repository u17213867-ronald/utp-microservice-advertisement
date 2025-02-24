import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'user_company',
    timestamps: true,
    comment: 'Table to link users with their respective companies'
  })
  export class UserCompanyModel extends Model<UserCompanyModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      field: 'id',
      type: DataType.INTEGER,
      allowNull: false,
      comment: 'Unique identifier for the user-company relation'
    })
    id: number;
  
    @Column({
      field: 'user_id',
      type: DataType.INTEGER,
      allowNull: false,
      comment: 'Identifier for the user'
    })
    userId: number;
  
    @Column({
      field: 'company_id',
      type: DataType.INTEGER,
      allowNull: false,
      comment: 'Identifier for the company'
    })
    companyId: number;
  
    @Column({
      field: 'first_name',
      type: DataType.STRING(100),
      allowNull: false,
      comment: 'User first name'
    })
    firstName: string;
  
    @Column({
      field: 'last_name',
      type: DataType.STRING(100),
      allowNull: false,
      comment: 'User last name'
    })
    lastName: string;
  
    @Column({
      field: 'email',
      type: DataType.STRING(100),
      allowNull: false,
      comment: 'User email address'
    })
    email: string;
  
    @Column({
      field: 'phone',
      type: DataType.STRING(20),
      allowNull: true,
      comment: 'User contact phone number'
    })
    phone: string;
  
    @Column({
      field: 'role',
      type: DataType.ENUM('admin', 'employee', 'manager'),
      allowNull: false,
      defaultValue: 'employee',
      comment: 'User role within the company'
    })
    role: 'admin' | 'employee' | 'manager';
  
    @CreatedAt
    @Column({
      field: 'created_at',
      type: DataType.DATE,
      defaultValue: DataType.NOW,
      comment: 'Record creation date'
    })
    createdAt: Date;
  
    @UpdatedAt
    @Column({
      field: 'updated_at',
      type: DataType.DATE,
      defaultValue: DataType.NOW,
      comment: 'Record last update date'
    })
    updatedAt: Date;
  
    @Column({
      field: 'status',
      type: DataType.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: 'Status of the user-company relation (1 for active, 0 for inactive)'
    })
    status: number;
  }
  