//We are using eris to manage the bot
const eris = require('eris');
const { token } = require('../keys.json');
const bot = new eris.Client(token);

const weather = require('./Weather.js');
const jokes = require('./Jokes.js');
const reddit = require('./Reddit.js');

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
  let message = msg.content;
  let regexword = /^showme\s/;
  let regexsecond = /.*?\w+.*?(\w+).*/
  let secondWord = regexsecond.exec(message);

  if(regexword.test(message)){
    switch(msg.content){
      case 'showme weather':
        weather.getWeather(msg,bot);
        return;
      case 'showme joke':
        jokes.getJoke(msg,bot);
        return;
    }

    reddit.getSubReddit(msg,bot,secondWord[1]);
    
  }
  
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
