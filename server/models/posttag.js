import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostTag.belongsTo(models.Post);
      PostTag.belongsTo(models.Tag);
    }
  }
  PostTag.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'PostTag',
    },
  );
  return PostTag;
}
