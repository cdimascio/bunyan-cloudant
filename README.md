# bunyan-cloudant
This is a [bunyan](https://github.com/trentm/node-bunyan) plugin for [Cloudant](https://cloudant.com/). It allows you to 'stream' your bunyan logs to Cloudant.

A "stream" is Bunyan's name for where it outputs log messages

## Install

`npm install bunyan-cloudant`

## Usage


```javascript
const bunyan = require('bunyan');
const CloudantStream = require('bunyan-cloudant);

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

```

## Options
`CloudantStream` takes the following options

```
{
  cloudant: { // required
    uri: 'http://user:pass@www.cloudant.com'
  },
  dbName: 'logs', // required
  log: myParentBunyanLogger // optional
}
```

#### Required Props
The `cloudant` property (*required*) must conform to `cloudant`'s Initialization object. See the 
[Initialize](https://github.com/cloudant/nodejs-cloudant) section.

The `dbName` property (*required*) is the name Cloudant datbase that to 'stream' logs

The `log` property (*optional*) specifies a parent Bunyan logger



# LICENSE
[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)