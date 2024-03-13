import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsTo(models.Organization);
      Post.belongsTo(models.Program);
      Post.hasMany(models.Bookmark);
      Post.hasMany(models.PostTag);
      Post.belongsToMany(models.Tag, { through: models.PostTag });
    }
  }
  Post.init(
    {
      postedOn: DataTypes.DATE,
      expiresOn: DataTypes.DATE,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      applicationUrl: DataTypes.STRING,
      isPaidOpportunity: DataTypes.BOOLEAN,
      entryCost: DataTypes.STRING,
      referredBy: DataTypes.STRING,
      isRecurring: DataTypes.BOOLEAN,
      isArchived: DataTypes.BOOLEAN,
      workLocation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
}
