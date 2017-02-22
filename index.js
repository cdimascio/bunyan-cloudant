'use strict';

var assert = require('assert');
var bunyan = require('bunyan');
var Cloudant = require('cloudant');

/**
 * CloudantStream write bunyan records to Cloudant
 *
 * @param {Object} opts options object.
 * @param {Object} opts.cloudant cloudant options object.
 * @param {Object} [opts.log] optional bunyan logger.
 *
 */
function CloudantStream(opts) {
  assert(typeof opts === 'object', 'required opts');
  assert(typeof opts.cloudant === 'object', 'required opts.cloudant. must be Cloudant config object.');
  assert(typeof opts.dbName === 'string', 'required opts.dbName. must be a string.');
  assert(!opts.log || typeof opts.log === 'object', 'optional opts.log. must be an bunyan logger instance');

  if (!opts.log) {
    this._log = bunyan.createLogger({
      name: 'bunyan-cloudant',
      level: process.env.LOG_LEVEL || bunyan.INFO
    });
  } else {
    this._log = opts.log.childLogger({
      component: 'bunyan-cloudant'
    });
  }

  this._cloudant = Cloudant(opts.cloudant);
  this._dbName = opts.dbName;
}

CloudantStream.prototype.write = function write(payload) {
  var self = this;
  var data;
  try {
    data = JSON.parse(payload);
  } catch (err) {
    self._log.warn({ err: err, data: payload }, 'unable to send log to Cloudant');
    return;
  }

  self._log.trace({ data: data }, 'sending payload to cloudant');
  self._cloudant.db.use(self._dbName).insert(data, function(err, data) {
    if (err) {
      self._log.warn({ err: err, data: data }, 'unable to send log to Cloudant');
    }
  });
};

module.exports = CloudantStream;
