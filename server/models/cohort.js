import { Model, Op } from 'sequelize';

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
      Cohort.hasMany(models.User);
    }
  }
  Cohort.init(
    {
      cohortNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: {
            args: /^\d+$/,
            msg: 'Cohort number is invalid',
          },
          async isUnique(value) {
            if (this.changed('cohortNumber')) {
              const record = await Cohort.findOne({
                where: {
                  id: {
                    [Op.ne]: this.id,
                  },
                  cohortNumber: value,
                },
              });
              if (record) {
                throw new Error('Cohort with this number already exists');
              }
            }
          },
          notNull: {
            msg: 'Cohort number cannot be blank',
          },
          notEmpty: {
            msg: 'Cohort number cannot be blank',
          },
        },
      },
      graduatedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Graduation timestamp cannot be blank',
          },
          notEmpty: {
            msg: 'Graduation timestamp cannot be blank',
          },
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^2\d\d\d$/,
            msg: 'Year is invalid',
          },
          notNull: {
            msg: 'Year cannot be blank',
          },
          notEmpty: {
            msg: 'Year cannot be blank',
          },
        },
      },
      term: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Term cannot be blank',
          },
          notEmpty: {
            msg: 'Term cannot be blank',
          },
          isIn: [['Spring', 'Summer', 'Winter']],
        },
      },
      affiliation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Affiliation cannot be blank',
          },
          notEmpty: {
            msg: 'Affiliation cannot be blank',
          },
          isIn: [['Dev/Mission', 'Goodwill']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Cohort',
    },
  );
  return Cohort;
}
