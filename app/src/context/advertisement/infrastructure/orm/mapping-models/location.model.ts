import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'location',
    comment: 'Table for storing location details',
    timestamps: false // No hay columnas de createdAt/updatedAt en esta tabla
  })
  export class LocationModel extends Model<LocationModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      field: 'id',
      type: DataType.INTEGER,
      allowNull: false,
      comment: 'Unique identifier for the location'
    })
    id: number;
  
    @Column({
      field: 'name',
      type: DataType.STRING(80),
      allowNull: false,
      comment: 'Name of the location (e.g., city, state, province)'
    })
    name: string;
  
    @AllowNull
    @Column({
      field: 'parent_id',
      type: DataType.INTEGER,
      comment: 'Reference to the parent location (e.g., a province might have a country as its parent)'
    })
    parentId: number;
  
    @AllowNull
    @Column({
      field: 'code',
      type: DataType.STRING(2),
      comment: 'Short code representing the location'
    })
    code: string;
  
    @AllowNull
    @Column({
      field: 'display_name',
      type: DataType.STRING(200),
      comment: 'Display name for the location (formatted for user interface)'
    })
    displayName: string;
  
    @AllowNull
    @Column({
      field: 'search_name',
      type: DataType.STRING(200),
      comment: 'Searchable name for the location (used in search algorithms)'
    })
    searchName: string;
  
    @AllowNull
    @Column({
      field: 'slug',
      type: DataType.STRING(200),
      comment: 'URL-friendly version of the location name'
    })
    slug: string;
  
    @AllowNull
    @Column({
      field: 'capital_id',
      type: DataType.INTEGER,
      comment: 'ID of the capital city associated with this location'
    })
    capitalId: number;
  
    @AllowNull
    @Column({
      field: 'latitude',
      type: DataType.DOUBLE,
      comment: 'Latitude coordinate of the location'
    })
    latitude: number;
  
    @AllowNull
    @Column({
      field: 'longitude',
      type: DataType.DOUBLE,
      comment: 'Longitude coordinate of the location'
    })
    longitude: number;
  
    @AllowNull
    @Column({
      field: 'children_count',
      type: DataType.INTEGER,
      comment: 'Number of child locations (e.g., districts under a province)'
    })
    childrenCount: number;
  
    @AllowNull
    @Column({
      field: 'level',
      type: DataType.SMALLINT,
      comment: 'Level of the location in the hierarchy (e.g., country = 1, state = 2, city = 3)'
    })
    level: number;
  
    @AllowNull
    @Column({
      field: 'adecsys_id',
      type: DataType.INTEGER,
      comment: 'Identifier used in the Adecsys system for this location'
    })
    adecsysId: number;
  
    @Column({
      field: 'ad_count',
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Number of ads or listings related to this location'
    })
    adCount: number;
  
    @Column({
      field: 'index_name',
      type: DataType.STRING(200),
      allowNull: false,
      comment: 'Name used for indexing in search engines (e.g., JavaLucene)'
    })
    indexName: string;
  
    @Column({
      field: 'country_code',
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Country code of the location'
    })
    countryCode: number;
  
    @Column({
      field: 'department_code',
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Department code of the location'
    })
    departmentCode: number;
  
    @Column({
      field: 'province_code',
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Province code of the location'
    })
    provinceCode: number;
  
    @Column({
      field: 'district_code',
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'District code of the location'
    })
    districtCode: number;
  
    @Column({
      field: 'status',
      type: DataType.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: 'Status of the location (active or inactive)'
    })
    status: number;
  }
  