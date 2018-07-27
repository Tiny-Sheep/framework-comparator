const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notNull: true
    }
  },
  framework: {
    type: Sequelize.ENUM,
    values: ['Angular', "React", "Vue", "Ember"]

  }

})




module.exports = Vote

