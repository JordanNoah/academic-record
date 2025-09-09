import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
  declare id: string;
  declare uuid: string;
  declare program_type_id: string;  // FK -> program_type.id
  declare abbr: string;             // unique
  declare name_i18n: any;           // JSON/JSONB
  declare description: string | null;
  declare options: any | null;
  declare active: boolean;
  declare created_at: Date | null;
  declare updated_at: Date | null;
  declare deleted_at: Date | null;
}

Program.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV4 },
  program_type_id: { type: DataTypes.BIGINT, allowNull: false },
  abbr: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  name_i18n: { type: DataTypes.JSONB, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  options: { type: DataTypes.JSONB, allowNull: true },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'program',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at',
});
