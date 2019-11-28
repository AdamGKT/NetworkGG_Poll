const Discord = require('discord.js');
const pollEmoji = require('./pollEmoji.js');

class Poll {
    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
    }

    getQuestion() {
        return (`:bar_chart: **${this.question}**`)
    }

    getAnswers() {
        const answerEmbed = new Discord.MessageEmbed()
        .setColor('#f8b132')
        .setDescription(this.getFormatedAnswer());

        return (answerEmbed);
    }

    getFormatedAnswer() {
        return (this.answers.map((answer, i) => {
            return (`${pollEmoji[i].emoji} ${answer}`);
        }).join("\n"));
    }

    reactYesNo(msg) {
        Promise.all([msg.react(pollEmoji.find((emo) => emo.name == "yes").emoji),
        msg.react(pollEmoji.find((emo) => emo.name == "no").emoji)]);
    }

    reactMulti(msg) {
        Promise.all(this.answers.map((ans, i) => msg.react(pollEmoji[i].emoji)));
    }
}

module.exports = Poll;