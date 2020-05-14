//We are using node-fetch to fetch data from public APIs
const fetch = require('node-fetch');

module.exports = {
  //Retrieves a random joke from the jokeApi
  getJoke: function (msg, bot){

    var message = "Sorry dude I couldn't get any Jokes.";

    fetch('https://sv443.net/jokeapi/v2/joke/Any?type=twopart')
        .then(res => res.json())
        .then(data =>{
          var joke = data['setup'];
          var delivery = data['delivery'];

          message = joke + '\n' + delivery;

          bot.createMessage(msg.channel.id, message);
        }).catch(err => bot.createMessage(msg.channel.id, message));
  }
};
