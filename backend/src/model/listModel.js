const sequelize = require("../utils/db");
const Sequelize = require("sequelize");

const List = sequelize.define("list", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = List;
