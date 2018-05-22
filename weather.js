//TODO: make the weather request
const https = require("https");
const config = require("./config.json");

module.exports = exports = {
    getWeather: function(callback){
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
    }
}