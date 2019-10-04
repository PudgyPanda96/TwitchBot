var tim = require("tmi.js");
const fetch = require("node-fetch");
const smash = require("./SmashApi/Smash");
var test;
var poke;
var players;

var options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: 'SigMBot',
    password: 'oauth:r16hpj88s5olyiqyfffektc0cxo3fv'
  },
  channels: ['PudgyPandaPlays', 'DarkGenexSmash', 'SIGMelee']
};

var client = new tim.client(options);
client.connect();

client.on("chat", function (channel, user, message, self) {
  if(self) return;

  //console.log(user);

  if(message == "!sigger") {
    client.action(channel, "Any Siggers? sigmL sigmL sigmL");
    //client.action('asidyx', 'Any siggers?');
    console.log(channel);
  }
  if(message.includes('!emotes')){
    client.action(channel, 'sigmPM sigmIsleep sigmZors sigmL sigmSim sigmWobble');
  }
  if(message.includes("!fact")){
    getPosts()
    setTimeout(function(){
     client.action(channel, user['display-name'] + " did you know " + test);
    }, 2000)

  }
  
  if(message.includes('!axe')){
    client.action(channel, 'https://www.youtube.com/watch?v=0RiCpqifNtg&');
  }

  if(user['display-name'] == '404Cray') {
    console.log("test");
    client.timeout(channel, 'ill_mind_of_hopsin_is_art', 5);
    client.action(channel, 'no talking nick gale');
  }

  if(message.includes("!h2h")) {
    var newMessage = message.replace("!h2h ", "");
    var newMessage2 = newMessage.replace(", ", ",");
    var splitMessage = newMessage2.split(",");
    var player1 = splitMessage[0];
    var player2 = splitMessage[1];
    console.log(player1);
    console.log(player2);

    smash.getAllPlayers();
    setTimeout(function(){
      var players = smash.getPlayers();
      setTimeout(function() {
        var ids = parseWantedPlayers(players, player1, player2)
        if(ids[0] == -1) {
          client.action(channel, player1 + " is not in the garpr database by that name");
        }
         else if(ids[1] == -1) {
          client.action(channel, player2 + " is not in the garpr database by that name");
        } else {
          setTimeout(function() {
            smash.getHeadToHead(ids[0], ids[1]);
            setTimeout(function() {
              var h2h = smash.getH2H();
              var response = player1 + " is currently " + h2h[0] + "-" + h2h[1] + " on " + player2;
              client.action(channel, response);
            }, 500)
          }, 5000)
        }
      }, 3000);
    },2000);
  }

  if(message.includes("!rank")) {
    var splitMessage = message.split(" ");
    var player = splitMessage[1];
    player = ' ' + player;
    smash.getRankingApi(player);
    setTimeout(function() {
      rank = smash.getRank();
      if(rank !== 0){
        var response = player + " is currently ranked " + rank + " in NJ";
      } else {
        var response = player + " is not currently ranked in NJ";
      }
      
      client.action(channel, response);
    }, 2000)
  }

  if(message.includes("!pr")){
    smash.getAllRankedPlayers();
    setTimeout(function() {
      pr = smash.getRankedPlayers();
      client.action(channel, "The current pr is: " + pr.toString());
    }, 2000)
  }

  if(message.includes("!pokemon")) {
    var num = Math.floor((Math.random() *151) + 1);
    getPokemon(num);
    setTimeout(function(){
      console.log(poke);
      client.action(channel, user['display-name'] + ' your pokemon is ' + poke);
    }, 2000)
  }
  if(message.includes('!bracket')) {
    client.action(channel, "Get it yourself you lazy fuck");
  }

  if(message.includes("!dice")){
    var num = Math.floor((Math.random() * 6) + 1);
    client.action(channel, user['display-name'] + " you rolled a " + num);
  }

  if(message.includes('!rps')){
    var num = Math.floor((Math.random() * 3) + 1);
    var rps = "";
    if(num == 1) {
      rps = "paper";
    } else if(num == 2) {
      rps = "rock";
    } else {
      rps = "scissors"
    }
    client.action(channel, user['display-name'] + " SHOOT: " + rps);
  }
});

function getPosts(){
  
  fetch('https://uselessfacts.jsph.pl//random.json?language=en')
    .then(res => res.json())
    .then(posts => {
      console.log(posts['text'])
      test = posts['text']
    })
    .catch(res=> res.json());
}

function getPokemon(num) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + num)
    .then(res => res.json())
    .then(post => {
      console.log(post);
      poke = post['name'];
    })
}

function parseWantedPlayers(players, player1, player2) {
  player1Found = false;
  player2Found = false;
  var ids = [];
  ids[0] = -1;
  ids[1] = -1;
  //console.log(players);
  for(index in players.players) {
    if(!player1Found && !player2Found) {
      if(player1.toString().toLowerCase() == players.players[index].name.toString().toLowerCase()){
        ids[0] = players.players[index].id;
        player1 = true;
      } else if(player2.toString().toLowerCase() === players.players[index].name.toString().toLowerCase()) {
        ids[1] = players.players[index].id;
        player2 = false;
      }
    } else {
      return ids;
    }
  }
  return ids;
}