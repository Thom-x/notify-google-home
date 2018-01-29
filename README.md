# notify-google-home
Send push notifications to Google Home Device

#### Installation

Edit example.js (IP of your device, may change the text)

```sh
C:\github\notify-google-home> npm install
C:\github\notify-google-home> node example.js
```

#### Usage 

```javascript
const pusher = require('notify-google-home');
pusher.ip("192.168.1.71");
pusher.notify("Salut !", (res, err) => {});
```