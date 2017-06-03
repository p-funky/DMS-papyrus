module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
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
