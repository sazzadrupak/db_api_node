const cors = require('cors');

const whitelist = ['http://localhost:8000', 'http://0.0.0.0:8000'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      exposedHeaders: 'x-auth-token',
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = (app) => {
  app.use(cors(corsOptionsDelegate));
};
