try {
  module.exports = require('./server/index.js');
} catch (e) {
  module.exports = require('./api/contact.js');
}

