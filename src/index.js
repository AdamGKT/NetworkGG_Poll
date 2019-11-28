const Discord = require('discord.js');
var auth = require('../auth.json');
const Parser = require('./parser.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const parser = new Parser(msg);
  const user = parser.parseUser();

  if (msg.author.bot == false) {
    msg.delete();
    msg.channel.send(user.getInfo());
  }
});

client.login(auth.token);