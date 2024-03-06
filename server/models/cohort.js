import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Cohort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      // Cohort.hasMany(models.User);
    }
  }
  Cohort.init(
    {
      cohortNumber: DataTypes.INTEGER,
      graduatedOn: DataTypes.DATE,
      year: DataTypes.STRING,
      term: DataTypes.STRING,
      affiliation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cohort',
    },
  );
  return Cohort;
}
