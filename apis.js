//TODO: make the weather request
const https = require("https");
const config = require("./config.json");

module.exports = exports = {
    getWeather: function(callback){ //getting the weather, hardcoded to TLV.
        https.get(`https://api.darksky.net/forecast/${config.weatherKey}/32.109333,34.855499`, res => {
            let body = '';
            
            res.on('data', chunk =>{
                body += chunk;
            });

            res.on('end', ()=>{
                const response = JSON.parse(body);
                callback(response);
            });
        });
    },
    getGif: function(search, callback){ //getting some gifs
        https.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${config.giphyKey}&limit=2`, res => {
            let body = '';
            
            res.on('data', chunk =>{
                body += chunk;
            });

            res.on('end', ()=>{
                const response = JSON.parse(body);
                callback(response);
            });
        });
    },
    getChuckNorris: function(callback){ // chuck norris joke
        https.get('https://api.chucknorris.io/jokes/random', res=>{
            let body = '';

            res.on('data', chunk =>{
                body += chunk;
            });

            res.on("end", chunk =>{
                const response = JSON.parse(body);
                callback(response);
            });
        });
    }
}