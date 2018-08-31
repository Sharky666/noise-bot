const Discord = require("discord.js");
const config = require("./config.json");
const apis = require("./apis.js");
const client = new Discord.Client();

let tips = ["If a guy asks you out, say no.", "Go outside.", "Meet someone.", "If you're hungry, get something to eat.", "Drink some water. You stupid fucking bitch.", "Eat some fucking vegtables.", "Fucking do something, so you won't go to sleep crying over shit that you could have done and didn't end up doing.", "Learn from your mistakes."];
const stdin = process.openStdin();
let authorLastChannel = null;

client.on("ready", () => {
    console.log(`${client.user.username} is ready.`);
});

//Terminal handler
stdin.addListener("data", d =>{
    if(authorLastChannel === null) return;
    d = d.toString().trim();
    authorLastChannel.sendMessage(d);
});
//Discord handler
client.on("message", msg => {
    if(msg.author.id === config.authorId);
        authorLastChannel = msg.channel;
    if (msg.author.bot) return; // if the author of the message is a bot, do nothing.
    if (msg.content.indexOf(config.prefix) !== 0) return; // if the message doesn't have the bot's prefix, do nothing.
    const parsedMsg = parseMessageContent(msg.content);
    switch (parsedMsg.cmd) { // handling communication with the clients.
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
        case "chuck-norris":
            msg.channel.sendMessage("give me a second, I am thinking of a good one!");
            apis.getChuckNorris(result =>{
                msg.channel.sendMessage(result.value);
            });
        break;
        case "gif":
        case "gifs":
            apis.getGif(parsedMsg.args.join(" "), result => {
                console.log(`client looked for ${parsedMsg.args.join(" ")}`);
                msg.channel.sendMessage(result.data[0].url)
                msg.channel.sendMessage(result.data[1].url)
            });
        break;
        };
});

function parseMessageContent(msg){
    let data = msg.toLowerCase().split(" ");
    let result = {
        wakeWord: data[0],
        cmd: data[1],
        args: data.slice(2)
    };
    return result;
};
client.login(config.token);