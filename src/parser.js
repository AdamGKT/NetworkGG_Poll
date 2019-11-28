const User = require('./user.js')

class Parser {
    constructor(msg) {
        this.msg = msg;
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
}

module.exports = Parser;