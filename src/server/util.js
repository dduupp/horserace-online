const crypto = require('crypto');

function generateGameId() {
  return crypto.randomBytes(2).toString('hex');
}

module.exports = {
  generateGameId
};
