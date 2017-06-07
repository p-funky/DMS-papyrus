import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'email already in use'
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
      unique: {
        args: true,
        msg: 'Username already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
          user.updateAt = Date.now();
        }
      }
    },
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Roles, {
          foreignKey: {
            name: 'roleId',
            onDelete: 'SET NULL'
          }
        });
        User.hasMany(models.Documents, {
          foreignKey: {
            name: 'ownerId',
            onDelete: 'SET NULL'
          }
        });
      }
    },
    freezeTableName: true,
    instanceMethods: {
      isPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};
