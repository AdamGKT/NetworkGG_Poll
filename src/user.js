const localRoles = require('./roles.js');

class User {
    constructor(username, userID, roles) {
        this.username = username;
        this.userID = userID;
        this.roles = roles;
    }

    getInfo() {
        const currentRolesEmoji = localRoles.filter((role) => {
            return this.roles.some((userRole) => userRole.name == role.name);
        }).map((role) => role.emoji).join(',');
        return ` [${currentRolesEmoji}] a créé un sondage :`
    }
}

module.exports = User;
