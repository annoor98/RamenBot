//We are using eris to manage the bot
const eris = require('eris');

const weather = require('./Weather.js');
const jokes = require('./Jokes.js');

//Put bot token here
const bot = new eris.Client('');

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
    if(msg.content === 'show weather'){
      weather.getWeather(msg, bot);
    }
});

bot.on('messageCreate', (msg) => {
    if(msg.content === 'show joke'){
      jokes.getJoke(msg, bot);
    }
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
