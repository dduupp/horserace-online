const bodyParser = require('body-parser');

const api = require('./routes/api');
const ws = require('./routes/ws');

module.exports = app => {
  require('express-ws')(app);

  app.use(bodyParser.json());
  app.use('/api', api);
  app.use('/ws', ws);
};
