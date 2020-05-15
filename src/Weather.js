//Put Open Weather Api Key and city key here
const {weatherKey} = require('../keys.json');
const {cityId} = require('../keys.json');
//We are using node-fetch to fetch data from public APIs
const fetch = require('node-fetch');

module.exports = {
  getWeather: function (msg, bot){
    var message = "Sorry! I couldn't get the weather.";
    var apiCall = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + "&APPID="
                  + weatherKey + "&&units=metric";

    fetch(apiCall).then(res => res.json()).then(data => {
      var temp = data['main']['temp'];
      var feels = data['main']['feels_like'];
      var description = data['weather'][0]['description'];

      message = "The temperature right now is " + temp + "°C. Feels like " +
                feels + "°C.\nWeather Type: " + description;
      bot.createMessage(msg.channel.id, message);

    }).catch(err => bot.createMessage(msg.channel.id, message));
  }
};
