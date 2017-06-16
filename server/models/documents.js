module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Note: Document with same title or exists' }
    },
    content: {
      type: DataTypes.TEXT,
    },
    accessId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    ownerId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'SET NULL'
        });
        Documents.belongsTo(models.Access, {
          foreignKey: 'accessId',
          onDelete: 'SET NULL'
        });
      }
    },
    freezeTableName: true
  });
  return Documents;
};
