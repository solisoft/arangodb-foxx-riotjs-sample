'use strict';
const api_key = 'key-24b8d9df24821ca47fd678e95957b476';
const domain = 'planning-essais.fr';
const request = require('@arangodb/request');

request({
  method: "POST",
  url: "https://api:"+ api_key +"@api.mailgun.net/v3/"+ domain +"/messages",
  form: {
    from: "Excited User <mailgun@planning-essais.fr>",
    to: "olivier@bonnau.re",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!"
  }
})