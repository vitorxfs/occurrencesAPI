import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

interface OccurrencesAttributes{
  id: number;
  description: string;
  code: string;
  registeredAt: Date;
}

type OccurrencesCreationAttributes = Optional<OccurrencesAttributes, 'id'>;

export class Occurrences extends Model<
  OccurrencesAttributes,
  OccurrencesCreationAttributes
> implements OccurrencesAttributes {
  id!: number;
  description!: string;
  code!: string;
  registeredAt!: Date;
}

export const init = (sequelize: Sequelize): void => {
  Occurrences.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    registeredAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { sequelize, tableName: 'Occurrences', timestamps: false });
};

export default Occurrences;
