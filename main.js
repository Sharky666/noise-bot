const Discord = require("discord.js");
const config = require("./config.json");
const apis = require("./apis.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} is ready.`);
});
let tips = ["If a guy asks you out, say no.", "Eat", "Go outside.", "Meet someone.", "If you're hungry, get something to eat.", "Drink some water. You stupid fucking bitch.", "Eat some fucking vegtables.", "Fucking do something, so you won't go to sleep crying over shit that you could have done and didn't end up doing.", "Learn from your mistakes."];
//straight calls.
client.on("message", msg => {
    if (msg.author.bot) return; // if the author of the message is the bot itself, do nothing.
    if (msg.content.indexOf(config.prefix) !== 0) return; // if the message doesn't have the bot's prefix, do nothing.
    msg.content = msg.content.substr(6); // removes the bot's prefix, for better handling. actually try changing it to config.prefix.
    msg.content = msg.content.toLocaleLowerCase(); // turn the message into lowercase, for better handling.
    console.log(msg.author.username);
    switch (msg.content) { // handling communication with the clients.
        case "hello":
        case "hey":
        case "hi":
            msg.channel.sendMessage("Hello handsome.");
        break;
        case "tip" :
        case "tips" :
            msg.channel.sendMessage(tips[Math.floor(Math.random(0, tips.length) * tips.length)]); // replying to the client with a random tip from the array "tips".
        break;
        case "weather":
            msg.channel.sendMessage(`beep bap boop`)
            apis.getWeather(result => {
                msg.channel.sendMessage(`${result.currently.summary}, ${Math.round((result.currently.temperature - 32) * 5 / 9)}`); //from fahrenheit to celsius
            });
        break;
        case "chuck norris":
            msg.channel.sendMessage("give me a second, I am thinking of a good one!");
            apis.getChuckNorris(result =>{
                msg.channel.sendMessage(result.value);
            });
        break;
        };
        //calls with options
        if(msg.content.startsWith("gif" || "gifs")){
            apis.getGif(/.+?\s(.+)/.exec(msg.content)[1], result => {
                console.log(`client looked for ${/.+?\s(.+)/.exec(msg.content)[1]}`);
                msg.channel.sendMessage(result.data[0].url)
                msg.channel.sendMessage(result.data[1].url)
            });
        };
});

client.login(config.token);