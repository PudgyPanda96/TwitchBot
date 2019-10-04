const fetch = require("node-fetch");

function getRankingApi(player) {
    fetch('http://localhost:8080/pr/getRank/' + player)
        .then(res => res.json())
        .then(posts => {
            this.rank = posts;
        })
        .catch(console.log("Catch"));

}

function getRank() {
    return this.rank;
}

function getAllRankedPlayers() {
    fetch('http://localhost:8080/pr/getCurrentPR')
    .then(res => res.json())
    .then(posts => {
        this.rankedPlayers = posts;
        console.log(posts);
    })
    .catch(console.log("Catch"));
}

function getRankedPlayers() {
    return this.rankedPlayers;
}

function getAllPlayers() {
    fetch('https://notgarpr.com:3001/newjersey/players')
        .then(res => res.json())
        .then(posts => {
            //console.log(posts);
            this.players = posts;
        })
        .catch(console.log("Catch"));
}

function getPlayers() {
    return this.players;
}

function getHeadToHead(player1, player2) {
    var url = 'https://notgarpr.com:3001/newjersey/matches/' + player1 + '?opponent=' + player2;
    fetch(url)
        .then(res => res.json())
        .then(posts => {
            //console.log(posts);
            this.h2h = [];
            this.h2h[0] = posts['wins'];
            this.h2h[1] = posts['losses'];
        })
        .catch(console.log("Catch"))
}

function getH2H() {
    return this.h2h;
}

module.exports.getRankingApi = getRankingApi;
module.exports.getRank = getRank;
module.exports.getAllRankedPlayers = getAllRankedPlayers;
module.exports.getRankedPlayers = getRankedPlayers;
module.exports.getAllPlayers = getAllPlayers;
module.exports.getPlayers = getPlayers;
module.exports.getHeadToHead = getHeadToHead;
module.exports.getH2H = getH2H;