//TODO: make the weather request
const https = require("https");
const config = require("./config.json");

module.exports = exports = {
    getWeather: function(callback){ //weather function.
        https.get(`https://api.darksky.net/forecast/${config.weatherKey}/32.109333,34.855499`, res => {
            let body = '';
            
            res.on('data', chunk =>{
                body += chunk;
            });

            res.on('end', ()=>{
                const response = JSON.parse(body);
                console.log(response.currently);
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