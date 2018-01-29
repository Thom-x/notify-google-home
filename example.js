'use strict';

const pusher = require('./notify-google-home');
pusher.ip("192.168.1.71");
pusher.notify("Salut !", (res, err) => { });