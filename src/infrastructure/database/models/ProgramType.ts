import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export type AcademicLevel = 'undergraduate' | 'postgraduate';

export class ProgramType extends Model<InferAttributes<ProgramType>, InferCreationAttributes<ProgramType>> {
  declare id: string;
  declare name: string;            // unique
  declare name_i18n: any;          // JSON/JSONB
  declare academic_level: AcademicLevel; // index + check
  declare created_at: Date | null;
  declare updated_at: Date | null;
}

ProgramType.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(10), allowNull: false, unique: true },
  name_i18n: { type: DataTypes.JSONB, allowNull: false },
  academic_level: {
    // En DB es varchar con CHECK; en app lo reforzamos con ENUM
    type: DataTypes.ENUM('undergraduate', 'postgraduate'),
    allowNull: false,
  },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  tableName: 'program_type',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ fields: ['academic_level'], name: 'program_type_academic_level_index' }],
});
