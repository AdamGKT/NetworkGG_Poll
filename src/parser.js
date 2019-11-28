const User = require('./user.js')

class Parser {
    constructor(msg) {
        this.msg = msg;
        this.parsedContent = this.msg.content.match(/"(.*?)"/g)
            .map((e) => e.replace(/\"/g, ""));
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
        return (this.parsedContent.shift());
    }

    isArgValid() {
        return (this.parsedContent.length != 2);
    }
}

module.exports = Parser;