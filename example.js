const bunyan = require('bunyan');
const CloudantStream = require('./index');

const cloudantStream = new CloudantStream({
  cloudant: {
    url: process.env.COUCHDB_URL
  },
  dbName: 'server-logs'
});

export const L = bunyan.createLogger({
  name: 'my-app',
  streams: [{
    stream: process.stdout
  }, {
    stream: cloudantStream
  }]
});
