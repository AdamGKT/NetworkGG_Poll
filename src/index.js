const Discord = require('discord.js');
var auth = require('../auth.json');
const Parser = require('./parser.js');
const Poll = require('./poll.js');


const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

  if (msg.author.bot == false) {
    msg.delete();
    try {
      if (msg.content.startsWith("/poll")) {
        const parser = new Parser(msg);
        if (parser.isArgValid()) {
          const user = parser.parseUser();
          const poll = new Poll(parser.parseQuestion(), parser.parseAnswers());
          msg.channel.send(user.getInfo());
          const msgQuestion = await msg.channel.send(poll.getQuestion());
          if (parser.isMultipleAnswer()){
            const msgAnswer = await msg.channel.send(poll.getAnswers());
            poll.reactMulti(msgAnswer);
          } else {
            poll.reactYesNo(msgQuestion);
          }
        }
      }
    } catch (err) {
      const msgError = await msg.channel.send({embed:{
        color: '#f8b132',
        description: "Pour créer un sondage dont la réponse est oui ou non tapez : **/poll \"Votre question\"**\nPour créer un sondage à réponse multiple (2 à 10 options) tapez : **\"Votre question\" \"Option 1\" \"Option 2\" ...**"
      }});
      setTimeout(() => {
        msgError.delete();
      }, 30000);
    }
  }
});

client.login(auth.token);