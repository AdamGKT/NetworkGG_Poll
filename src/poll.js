class Poll {
    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
    }

    getQuestion() {
        return (`:bar_chart: **${this.question}**`)
    }

    getAnswers() {
        
    }
}

module.exports = Poll;