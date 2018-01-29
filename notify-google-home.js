'use strict';

const Client = require('castv2-client').Client;
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
const googletts = require('google-tts-api');

var deviceAddress;
var language;
var googlettsaccent = 'fr';


const ip = function (ip, lang = 'fr-FR') {
  deviceAddress = ip;
  language = lang;
  return this;
}

const accent = function (accent) {
  googlettsaccent = accent;
  return this;
}

const notify = function (message, callback) {
  if (!deviceAddress) {
    callback(null, 'no device found');
  } else {
    getSpeechUrl(message, deviceAddress, function (res) {
      callback(res);
    });
  }
};

const play = function (mp3_url, callback) {
  if (!deviceAddress) {
    callback(null, 'no device found');
  } else {
    getPlayUrl(mp3_url, deviceAddress, function (res) {
      callback(res);
    });
  }
};

const getSpeechUrl = function (text, host, callback) {
  googletts(text, language, 1, 1000, googlettsaccent).then(function (url) {
    onDeviceUp(host, url, function (res) {
      callback(res)
    });
  }).catch(function (err) {
    console.error(err.stack);
  });
};

const getPlayUrl = function (url, host, callback) {
  onDeviceUp(host, url, function (res) {
    callback(res)
  });
};

const onDeviceUp = function (host, url, callback) {
  const client = new Client();
  client.connect(host, function () {
    client.launch(DefaultMediaReceiver, function (err, player) {
      const media = {
        contentId: url,
        contentType: 'audio/mp3',
        streamType: 'BUFFERED' // or LIVE
      };
      player.load(media, { autoplay: true }, function (err, status) {
        client.close();
        callback('Device notified');
      });
    });
  });

  client.on('error', function (err) {
    console.log('Error: %s', err.message);
    client.close();
    callback('error');
  });
};

exports.ip = ip;
exports.accent = accent;
exports.notify = notify;
exports.play = play;