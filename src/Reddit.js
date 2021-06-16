//We are using node-fetch to fetch data from public APIs
const fetch = require('node-fetch');

module.exports = {
  //Retrieves a random post/image from Reddit.
  getSubReddit: function (msg, bot, subreddit){

    fetch('https://www.reddit.com/r/' + subreddit + '/random/.json')
        .then(res => res.json())
        .then(data =>{
          var title = data[0]['data']['children'][0]['data']['title'];
          var url = 'https://www.reddit.com' + data[0]['data']['children'][0]['data']['permalink'];
          var imageUrl = data[0]['data']['children'][0]['data']['url'];

          bot.createMessage(msg.channel.id,{
              "embed": {
                "title": 	title,
                "description": 	"r/" + subreddit,
                "url": url,
                "color": 16098851,
                "image": {
                  "url": imageUrl
                }
              }
            });

        }).catch(err => bot.createMessage(msg.channel.id, "Sorry! I couldn't get anything from Reddit."));
  }

};
