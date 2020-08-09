const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./startapp/unhandlePromiseRejection');
require('./startapp/cors')(app);
require('./startapp/routes')(app);

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Listening to port ${port}...`)
);
module.exports = server;
