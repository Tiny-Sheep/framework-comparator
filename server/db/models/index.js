const Vote = require('./vote')
const Framework = require('./framework')

Vote.belongsTo(Framework)
Framework.hasMany(Vote)


module.exports = {
  Vote,
  Framework
}

