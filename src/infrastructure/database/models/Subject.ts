import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export class Subject extends Model<InferAttributes<Subject>, InferCreationAttributes<Subject>> {
  declare id: string;
  declare uuid: string;
  declare abbr: string;              // varchar(15)
  declare name_i18n: any;            // JSONB
  declare description: string | null;
  declare options: any | null;
  declare active: boolean;
  declare created_at: Date | null;
  declare updated_at: Date | null;
  declare deleted_at: Date | null;
}

Subject.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, unique: true },
  abbr: { type: DataTypes.STRING(15), allowNull: false, unique: true },
  name_i18n: { type: DataTypes.JSONB, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  options: { type: DataTypes.JSONB, allowNull: true },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'subject',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,              // usa deleted_at
  deletedAt: 'deleted_at',
});
