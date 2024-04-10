import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class SurveyResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyResponse.belongsTo(models.User);
    }
  }
  SurveyResponse.init(
    {
      isJob: DataTypes.BOOLEAN,
      isVolunteer: DataTypes.BOOLEAN,
      isOther: DataTypes.BOOLEAN,
      expiresOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SurveyResponse',
    },
  );

  return SurveyResponse;
}
