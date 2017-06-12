module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Role title must be unique'
      },
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'roles can only contain letters'
        },
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.User, {
          foreignKey: {
            name: 'roleId',
            onDelete: 'SET NULL'
          }
        });
      }
    },
    freezeTableName: true
  });
  return Roles;
};
