/// <reference path="../include.d.ts" />

var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('start', function() {
    console.log('server started');
    emitter.emit('start');
});

emitter.emit('start');
