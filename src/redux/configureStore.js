if (process.env.NODE_ENV === 'production') {
  module.exports = require('../stores/configureStore.prod');
} else {
  module.exports = require('../stores/configureStore.dev');
 }