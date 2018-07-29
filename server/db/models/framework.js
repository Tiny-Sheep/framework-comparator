const Sequelize = require('sequelize')
const db = require('../db')

const Framework = db.define('framework', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  watchers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  issues: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  pushes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }

})




module.exports = Framework


