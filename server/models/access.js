module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Access title must be unique'
      },
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'access can only contain letters'
        },
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Access.hasMany(models.Documents, {
          foreignKey: 'accessId',
          onDelete: 'SET NULL'
        });
      }
    },
    freezeTableName: true,
  });
  return Access;
};
