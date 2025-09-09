import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export type VersionStatus = 'draft' | 'published' | 'unpublished';
export type VersionModality = 'virtual' | 'on-site' | 'blended';
export type TrainingType = 'investigation' | 'professionalization' | 'investigation-professionalization';

export class Version extends Model<InferAttributes<Version>, InferCreationAttributes<Version>> {
  declare id: string;
  declare uuid: string;
  declare program_id: string;       // FK -> program.id
  declare name: string;             // varchar(40), unique por (program_id, name)
  declare description: string | null;
  declare status: VersionStatus;    // index
  declare modality: VersionModality | null; // index
  declare training_type: TrainingType | null; // index
  declare credits: any;             // JSON/JSONB
  declare options: any | null;
  declare created_at: Date | null;
  declare updated_at: Date | null;
  declare deleted_at: Date | null;
}

Version.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV4 },
  program_id: { type: DataTypes.BIGINT, allowNull: false },
  name: { type: DataTypes.STRING(40), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.ENUM('draft', 'published', 'unpublished'), allowNull: false },
  modality: { type: DataTypes.ENUM('virtual', 'on-site', 'blended'), allowNull: true },
  training_type: {
    type: DataTypes.ENUM('investigation', 'professionalization', 'investigation-professionalization'),
    allowNull: true,
  },
  credits: { type: DataTypes.JSONB, allowNull: false },
  options: { type: DataTypes.JSONB, allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'version',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at',
  indexes: [
    { unique: true, fields: ['program_id', 'name'], name: 'version_unique' },
    { fields: ['status'], name: 'version_status_index' },
    { fields: ['modality'], name: 'version_modality_index' },
    { fields: ['training_type'], name: 'version_training_type_index' },
  ],
});
