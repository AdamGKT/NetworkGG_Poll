const User = require('./user.js')

class Parser {
    constructor(msg) {
        this.msg = msg;
        this.parsedContent = this.msg.content.match(/"(.*?)"/g);
        if (this.parsedContent.length >= 1)
            this.parsedContent = this.parsedContent.map((e) => e.replace(/\"/g, ""));
    }

    parseUser() {
        const {
            author: {
                username, id
            },
            member: {
                roles
            }
        } = this.msg;
        return new User(username, id, roles);
    }

    parseQuestion() {
        return (this.parsedContent[0]);
    }

    parseAnswers() {
        return (this.parsedContent.slice(1));
    }

    isArgValid() {
        return (this.parsedContent.length != 2);
    }

    isMultipleAnswer() {
        return (this.parsedContent.length > 2);
    }
}

module.exports = Parser;