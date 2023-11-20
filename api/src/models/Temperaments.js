const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define('temperament', {
    UUID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

  },
  { timestamps: false });
};