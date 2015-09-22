var Transform = require('stream').Transform,
    util = require('util');

var Buffr = function(chunks) {
  Transform.call(this);

  this.chunks = chunks || [];

  if (chunks) {
    this.load();
  }
};
util.inherits(Buffr, Transform);

Buffr.prototype._transform = function(chunk, encoding, callback) {
  this.chunks.push(chunk);
  this.push(chunk);
  callback();
};

Buffr.prototype.duplicate = function () {
  return new Buffr(this.chunks);
};

//
// Load chunks that were passed into the constructor as a new stream
//
Buffr.prototype.load = function () {
  for(var i=0; i<this.chunks.length; i++) {
    this.push(this.chunks[i]);
  }
  this.push(null);
};

module.exports = Buffr;
