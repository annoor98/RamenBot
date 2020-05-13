//We are using eris to manage the bot
const eris = require('eris');
//We are using node-fetch to fetch data from public APIs
const fetch = require('node-fetch');
//Put bot token here
const bot = new eris.Client('');
//Put Open Weather Api Key and city key here
const weatherKey = '';
const cityId = '';

bot.on('ready', () => {
  console.log('Connection Successful!');
});

bot.on('messageCreate', async (msg) =>{
  const isMentioned = msg.mentions.find(
    mentionedUser => mentionedUser.id === bot.user.id,
  );

  if (isMentioned){
    try{
      await msg.channel.createMessage("What's Up?");
    }catch(err){
      console.warn('Failed to respond to mention.');
      console.warn(err);
    }

  }

});

bot.on('messageCreate', (msg) => {
    if(msg.content === 'show me weather'){
      getWeather(msg);
    }
});

function getWeather(msg){
  var message = "Sorry dude I couldn't get the weather.";
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

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
