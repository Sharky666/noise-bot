//TODO: put the weather function here and export it into the 'main.js' file.
//TODO: also make it work.
const https = require("https");

module.exports = exports = {
    getWeather: function(){
        https.get("https://api.darksky.net/forecast/5e53b4cbe9686ba91db22667471617f4/32.109333,34.855499", res => {
            let body = '';
            
            res.on('data', chunk =>{
                body += chunk;
            });

            res.on('end', ()=>{
                const response = JSON.parse(body);
                console.log(response.currently);
                return response;
                // callback(response);
            });
        });
    }
}