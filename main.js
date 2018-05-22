const Discord = require("discord.js");
const config = require("./config.json");
const weather = require("./weather");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} is ready.`)
});
let tips = ["If a guy asks you out, say no.", "Eat", "Go outside"];
client.on("message", msg => {
    if (msg.author.bot) return; // if the author of the message is the bot itself, do nothing.
    if (msg.content.indexOf(config.prefix) !== 0) return; // if the message doesn't have the bot's prefix, do nothing.
    msg.content = msg.content.substr(6); // removes the bot's prefix, for better handling.
    msg.content = msg.content.toLocaleLowerCase(); // turn the message into lowercase, for better handling.
    console.log(msg.author.username);
    switch (msg.content) { // handling communication with the clients.
        case "hello":
        case "hey":
        case "hi":
            msg.reply("Hello handsome.");
        break;
        case "tip" :
        case "tips" :
            msg.reply(tips[Math.floor(Math.random(0, tips.length) * tips.length)]); // replying to the client with a random tip from the array "tips".
        break;
        case "weather":
        msg.reply(`Working on it!. beep boop bap :D`)
            weather.getWeather(result => {
                msg.reply(`${result.currently.summary}, ${result.currently.temperature}`);
            });
        break;
        };
});

client.login(config.token);