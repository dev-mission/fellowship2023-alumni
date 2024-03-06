import { Model, Op } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program.init(
    {
      OrganizationId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Program',
    },
  );
  return Program;
}
