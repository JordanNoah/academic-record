import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '@/infrastructure/database/sequelize';

export class AreaProgram extends Model<InferAttributes<AreaProgram>, InferCreationAttributes<AreaProgram>> {
  declare area_id: string;    // FK -> area.id
  declare program_id: string; // FK -> program.id
}

AreaProgram.init({
  area_id: { type: DataTypes.BIGINT, allowNull: false },
  program_id: { type: DataTypes.BIGINT, allowNull: false },
}, {
  sequelize,
  tableName: 'area_program',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['area_id', 'program_id'], name: 'area_program_area_id_program_id_unique' },
  ],
});
