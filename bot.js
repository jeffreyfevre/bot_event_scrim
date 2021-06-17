
const dotenv = require("dotenv");
dotenv.config({ path: `.env.local` });

const Discord = require("discord.js");
const { poll } = require('discord.js-poll');
const config = require("./config");
const client = new Discord.Client();
const guild = client.guilds;
let number_mate = 0;
const axios = require("axios");
const cheerio = require("cheerio");
var cron = require('node-cron');
let mates = [];
let voted = [];


let player = {
    "name" :"",
    "lvl":0,
    "roles":[]
}

let matesTournoi = [];
let players =[
    player = {
        "name" :"Viopalix",
        "lvl":0,
        "roles":["Support"]
    },
    player = {
        "name" :"Yamete Onee San",
        "lvl":0,
        "roles":["Midle","ADC"]
    },
    player = {
        "name" :"Rhal",
        "lvl":0,
        "roles":["Top","ADC","Support"]
    },
    player = {
        "name" :"Ninshinay",
        "lvl":0,
        "roles":["Jungle"]
    },
    player = {
        "name" :"Tenpu",
        "lvl":0,
        "roles":[/*"Midle"*/,"Support"]
    },
    player = {
        "name" :"Ourak",
        "lvl":0,
        "roles":["Jungle","Top"/*,"Midle"*/]
    },
    player = {
        "name" :"Zakaross",
        "lvl":0,
        "roles":[/*"Midle"*/"Top"]
    },
    player = {
        "name" :"Flyzerd",
        "lvl":0,
        "roles":["Jungle","Top"]
    },
    player = {
        "name" :"jokerabat",
        "lvl":0,
        "roles":["Support","Top"]
    },
    player = {
        "name" :"FrozzenHollow",
        "lvl":0,
        "roles":["Jungle","ADC"]
    }
];

let allRoles = [
    role = {
        "name":"Midle",
        "count":0,
        "emote":"1️⃣"
    }
    ,
    role = {
        "name":"Support",
        "count":0,

        "emote":"2️⃣"
    },role = {
        "name":"Jungle",
        "count":0,
        "emote":"3️⃣"
    },role = {
        "name":"ADC",
        "count":0,
        "emote":"4️⃣"
    },role = {
        "name":"Top",
        "count":0,
        "emote":"5️⃣"
    }
]

let matestest = [
    "Viopalix",
    "Yamete Onee San",
    "Rhal",
    "Ninshinay",
    "Tenpu",
    "Ourak",
    "Zakaross",
    "Flyzerd",
    "jokerabat",
    "FrozzenHollow"
]
let team1 = {
    "midle" : "",
    "top" : "",
    "jungle" : "",
    "adc" : "",
    "support":"",
}
let team2 = {
    "midle" : "",
    "top" : "",
    "jungle" : "",
    "adc" : "",
    "support":"",
}

const addReactions = (message) => {
    message.react('1️⃣');
    message.react('2️⃣');
    message.react('3️⃣');
    message.react('4️⃣');
    message.react('5️⃣');

}
const addReactions2 = (message) => {
    message.react('👍');
    message.react('👎');
    message.react('🤞');
}


const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Gérer les roles des utilisateurs')
    .addField('Top', ':one:', false)
    .addField('Midle', ':two:', false)
    .addField('Jungle', ':three:', false)
    .addField('Support', ':four:', false)
    .addField('ADC', ':five:', false)

const scrimMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Scrim ce soir ? 21 h')
    .addField('Je joue ce soir', ':thumbsup:', false)
    .addField('Je joue pas ce soir', ':thumbsdown:', false)
    .addField('Je sais pas', ':fingers_crossed:', false)


const tournoiMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Organisation tournoi dimanche 27 juin à 16h ')
    .setDescription("Le plan c'est d'avoir 20 personnes et 4 remplacants, d'essayer de faire des équipes équilibré ")
    .addField('Je veux être dans une team', ':thumbsup:', false)
    .addField('Je ne suis pas disponible', ':thumbsdown:', false)
    .addField('Je veux bien être remplacant', ':fingers_crossed:', false)



client.login(config.BOT_TOKEN).then(() => {
    console.log("Bot connecté !");

});

cron.schedule('* * * * *', async () => {
    let edtResponse = await fetchLink();
    const channel = client.channels.cache.get("851083668403519529");
    channel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();
        if ( lastMessage !== undefined && lastMessage.content !== edtResponse )
        {
            channel.send(edtResponse);
            edtcron = edtResponse;
        }
    })
        .catch(console.error);
});
async function fetchLink(retryCount = 0, maxCount = 5) {


    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const url = new URL(link);
    const linkDate = new Date(url.searchParams.get("date"));
    linkDate.setHours(0, 0, 0, 0);

    if (linkDate >= date) {
        return `${count} liens trouvées. :construction_worker:\r\nLien : ${link}`;
    } else {
        if (retryCount < maxCount) {
            console.log(
                `Link not valid, retrying... (${retryCount} attemp of ${maxCount})`
            );
            return fetchLink(retryCount + 1, maxCount);
        } else {
            return `Error : Failed to fetch link for ${date.toLocaleDateString()}, total attemps : ${retryCount}.`;
        }
    }
}
client.on("message",  async function (message) {
    const prefix = "!";
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    if (command === "scrim") {
        const timeTaken = Date.now() - message.createdTimestamp;
        let chann = message.channel;
        chann.send(scrimMessage).then(message =>{
            addReactions2(message);
            number_mate = 0;

            client.on('messageReactionAdd',(reaction,user)=>{
                console.log(reaction.emoji);
                console.log(reaction.emoji.name == '👍');
                if (reaction.emoji.name == '👍' && user.id != client.user.id && user.bot == false) {
                    number_mate++
                    if (mates.indexOf(user.username) == -1)
                        mates.push(user.username)

                    console.log("up")
                }
                else if (reaction.emoji.name == '👎' && user.id != client.user.id && user.bot == false){
                    user.send("mechant");
                    console.log("down")

                }
            })
            client.on('messageReactionRemove',(reaction,user)=>{
                console.log(reaction.emoji);
                console.log(reaction.emoji.name == '👍');
                if (reaction.emoji.name == '👍' && user.id != client.user.id && user.bot == false) {

                    user.send("mechant");
                    console.log("up");
                }
                else if (reaction.emoji.name == '👎' && user.id != client.user.id && user.bot == false){
                    user.send("gentil");
                    console.log("down")

                }
            })
        });
    }
    if (command === "tournoi") {
        const timeTaken = Date.now() - message.createdTimestamp;
        let chann = message.channel;
        chann.send(tournoiMessage).then(message =>{
            addReactions2(message);
            number_mate = 0;

            client.on('messageReactionAdd',(reaction,user)=>{
                console.log(reaction.emoji);
                console.log(reaction.emoji.name == '👍');
                if (reaction.emoji.name == '👍' && user.id != client.user.id && user.bot == false) {
                    number_mate++
                    console.log(user);
                    if (matesTournoi.findIndex(user.username) == -1)
                        matesTournoi.push(user.username)
                    user.send("Cool ! Si tu es en retard tu seras fouetté 100 fois")
                    console.log("up")
                }
                else if (reaction.emoji.name == '👎' && user.id != client.user.id && user.bot == false){
                    user.send("mechant");
                    console.log("down")
                }
            })
            client.on('messageReactionRemove',(reaction,user)=>{
                console.log(reaction.emoji);
                console.log(reaction.emoji.name == '👍');
                if (reaction.emoji.name == '👍' && user.id != client.user.id && user.bot == false) {
                    if (matesTournoi.findIndex(user.username) != -1)
                        matesTournoi.remove(user.username)
                    user.send("mechant");
                    console.log("up");
                }
                else if (reaction.emoji.name == '👎' && user.id != client.user.id && user.bot == false){
                    user.send("gentil");
                    console.log("down")

                }
            })
        });
    }
    if (command === "test"){
        /*message.user.send(exampleEmbed).then(message => {
            addReactions(message)
            client.on('messageReactionAdd',(reaction,user) =>{
                if (reaction.emoji.name == '1️⃣')
                {
                    let role = message.guild.roles.cache.find(r => r.name === "Top");
                    console.log(role);
                    let tt = message.guild.roles.cache
                    console.log(tt)
                    user.roles.add(role)
                }
                else if (reaction.emoji.name == '2️⃣')
                {
                    let role = message.guild.roles.cache.find(r => r.name === "Midle");
                    user.roles.add(role)
                }
                else if (reaction.emoji.name == '3️⃣')
                {
                    let role = message.guild.roles.cache.find(r => r.name === "Jungle");
                    user.roles.add(role)
                }
                else if (reaction.emoji.name == '4️⃣')
                {
                    let role = message.guild.roles.cache.find(r => r.name === "Support");
                    user.roles.add(role)
                }
                else if (reaction.emoji.name == '5️⃣')
                {
                    let role = message.guild.roles.cache.find(r => r.name === "ADC");
                    user.roles.add(role)
                }
            })
        });*/
        console.log(message.guild.roles.cache.forEach(role => {
            console.log(role);
        }))
    }
    if (command === "users")
    {
        //client.users.cache.forEach(member => console.log(member.username));
        //let users = client.users.cache
        let users = message.guild.members.cache
        /*console.log(message.guild.members.cache);*/
        users.forEach(guildMember => {
            console.log(guildMember)
            if (guildMember.user.bot != true)
            {
                guildMember.send(exampleEmbed).then(message2 => {
                    addReactions(message2)
                    console.log(message2)
                    client.on('messageReactionAdd',(reaction,user) =>{

                        let mate = users.find(u => u == user.id)

                        for (let i =0;i<allRoles.length;i++)
                        {
                            if (reaction.emoji.name == allRoles[i].emote && user.id != client.user.id && user.bot == false)
                            {
                                let role = message.guild.roles.cache.find(r => r.name == allRoles[i].name);

                                if (role !== undefined || role != null )
                                {
                                    mate.roles.add(role)
                                    mate.send("Ton role"+allRoles[i].name+" a été ajouté");
                                }
                            }
                        }

                    })
                    client.on('messageReactionRemove',(reaction,user) =>{
                        let mate = users.find(u => u == user.id)
                        for (let i =0;i<allRoles.length;i++)
                        {
                            if (reaction.emoji.name == allRoles[i].emote && user.id != client.user.id && user.bot == false)
                            {
                                let role = message.guild.roles.cache.find(r => r.name == allRoles[i].name);

                                if (role !== undefined || role != null )
                                {
                                    mate.roles.remove(role)
                                    mate.send("Ton role"+allRoles[i].name+" a été ajouté");
                                }
                            }
                        }
                    })
                });
            }
        });
    }
    if (command === "numb")
    {
        message.reply("Ce soir on sera " + number_mate);
    }
    if (command === "liste")
    {
        let msgtxt;
        console.log(mates);


        for (let i =0 ;  i< mates.length ; i++)
        {
            console.log(mates[i])
            if (mates[i] !== undefined)
                msgtxt += mates[i]+ "\n";
        }
        message.reply(msgtxt);
        console.log(msgtxt)
    }
    if (command === "c"){
        message.reply("en cours");
        for (let i=0;i< matestest.length;i++)
        {
            var config = {
                method: 'get',
                url: 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+matestest[i],
                headers: {
                    'X-Riot-Token': 'RGAPI-3e35bdfd-0781-45bc-96b6-df7399f2c3c3'
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    players[i].lvl =response.data.summonerLevel;
                    for (let m = 0;m<players.length;m++)
                    {
                        for (let j =0;j<allRoles.length;j++)
                        {
                            let int = players[m].roles.findIndex(p => p == allRoles[j].name)
                            console.log(int);
                            if (int != -1)
                                allRoles[j].count ++;
                        }


                    }
                    for (let k =0;k<allRoles.length;k++)
                    {
                        if (allRoles[k].count < 2)
                        {
                            message.reply("Vous n'avez pas assez de "+allRoles[k].name);
                        }
                    }
                    //allRole(players);
                    //console.log(players);
                })
                .catch(function (error) {
                    console.log(error);
                });

            // Requete rank
            /*var config = {
                method: 'get',
                url: 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/VYMmfoG9VroDtpQwPKT79hSIiiVX1nhJOdJSfXcmPvCCqtE',
                headers: {
                    'X-Riot-Token': 'RGAPI-3e35bdfd-0781-45bc-96b6-df7399f2c3c3'
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });*/

        }



    }
    if (command === "buildTeam")
    {
        console.log("coucou")
        //let player = riotRequest.request('euw1', 'summoner', '/lol/summoner/v4/summoners/by-name/Ninshinay', function(err, data) {});

        axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Ninshinay', {
            headers: {
                Authorization: 'X-Riot-Token ' + "RGAPI-3e35bdfd-0781-45bc-96b6-df7399f2c3c3" //the token is a variable which holds the token
            }
        }).then(function (response) {
            console.log(response);
        })
    }
})

function allRole(arrayPlayers,arrayRoles)
{

}
function generateteam(arrayPlayers,team){

    let max = 10

    for (let r in team1){
        let arrayPlayersBypost = [];
        for (let i = 0; i<arrayPlayers.length;i++ )
        {
            let ret = arrayPlayers[i].findIndex(r)
            if (ret != -1)
            {
                arrayPlayersBypost.push(arrayPlayers[i]);
            }
        }
        let p  = getRandomInt(arrayPlayersBypost.length + 1);
        arrayPlayersBypost[p]
    }

}
function generateMAtch(){

}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


