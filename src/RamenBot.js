//We are using eris to manage the bot
const eris = require('eris');
const { token } = require('../keys.json');
const bot = new eris.Client(token);

const weather = require('./Weather.js');
const jokes = require('./Jokes.js');
const memes = require('./Memes.js');

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

bot.on('messageCreate',(msg) => {
  switch(msg.content){
    case 'show weather':
      weather.getWeather(msg,bot);
      break;
    case 'show joke':
      jokes.getJoke(msg,bot);
      break;
    case 'show dankmeme':
      memes.getMemes(msg,bot, 'dankmemes');
      break;
    case 'show meme':
      memes.getMemes(msg,bot, 'memes');
      break;
    }
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
