module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: null
        });
        Documents.belongsTo(models.Access, {
          foreignKey: 'accessId',
          onDelete: null
        });
      }
    },
    freezeTableName: true
  });
  return Documents;
};
