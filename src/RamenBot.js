const eris = require('eris');

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

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
