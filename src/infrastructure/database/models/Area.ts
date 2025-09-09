// src/models/Area.ts
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export class Area extends Model<InferAttributes<Area>, InferCreationAttributes<Area>> {
  declare id: string;                // BIGINT -> string para evitar overflow
  declare uuid: string;              // UUID
  declare abbr: string;              // varchar(5)
  declare name_i18n: any;            // JSON/JSONB
  declare description: string | null;
  declare options: any;              // JSON NOT NULL
  declare active: boolean;           // default true
  declare created_at: Date | null;
  declare updated_at: Date | null;
  declare deleted_at: Date | null;
}

Area.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    // El dump no define default en DB; definirlo en app te ahorra setearlo a mano:
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  abbr: { type: DataTypes.STRING(5), allowNull: false, unique: true },
  name_i18n: { type: DataTypes.JSONB, allowNull: false },  // JSONB en Postgres
  description: { type: DataTypes.TEXT, allowNull: true },
  options: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'area',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at',
  freezeTableName: true,
  underscored: true,
});
