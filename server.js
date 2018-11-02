'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest');
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://admin:TecnologiasEmergentes1@ds029793.mlab.com:29793/te-dashboard';

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
}

mongoose.connect(mongoDbUri, {
  useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
  console.log(`app is connected to ${mongoDbUri}`);
});
mongoose.connection.on('error', err => {
  console.log('error while connecting to mongodb', err);
});

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
  });
});
