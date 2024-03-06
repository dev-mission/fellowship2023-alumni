import { Model, Op } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.Post);
      Organization.hasMany(models.Program);
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Organization',
    },
  );
  return Organization;
}
