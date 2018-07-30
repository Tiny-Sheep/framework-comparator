const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  session: {
    type: Sequelize.STRING,
    unique: true,

  }
})

module.exports = Vote


