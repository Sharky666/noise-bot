const Discord = require("discord.js");
const config = require("./config.json");
const weather = require("./weather");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} is ready.`)
});

client.on("message", msg => {
    if (msg.author.bot) return; // if the author of the message is the bot itself, do nothing.
    if (msg.author.username === "h̶ ̶i̶ ̶l̶ ̶l̶ ̶i̶ ̶e̶ (｡ಥ︿ಥ｡)") msg.reply("Hillie, stop."); //tells hillie to stop.
    if (msg.author.username === "h̶ ̶i̶ ̶l̶ ̶l̶ ̶i̶ ̶e̶ (｡ಥ︿ಥ｡)") return; // if the message was sent from hillie, do nothing.
    if (msg.content.indexOf(config.prefix) !== 0) return; // if the message doesn't have the bot's prefix, do nothing.
    msg.content = msg.content.substr(6); // removes the bot's prefix, for better handling.
    msg.content = msg.content.toLocaleLowerCase(); // turn the message into lowercase, for better handling.
    console.log(msg.author.username);
    if(msg.content === "hello") msg.reply("you're looking quite aesthetic today.");
    if(msg.content === "weather") msg.reply(`${weather.getWeather()}`);
});
client.login(config.token);