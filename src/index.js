const Discord = require('discord.js');
var auth = require('../auth.json');
const Parser = require('./parser.js');
const Poll = require('./poll.js');


const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.author.bot == false) {
    const parser = new Parser(msg);
    const user = parser.parseUser();
    msg.delete();
    if (msg.content.startsWith("/poll") && parser.isArgValid()) {
      const poll = new Poll(parser.parseQuestion(), parser.parseAnswers());
      msg.channel.send(user.getInfo());
      msg.channel.send(poll.getQuestion());
    }
  }
});

client.login(auth.token);