const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {


    res.sendfile(__dirname + '/main.html');
});



    var cityEntered = req.body.cityName;

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityEntered + '&appid=0ad47c3adbe96fb47a1ab6d178fc181b';

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            // console.log(data);
            const weatherData = JSON.parse(data);

            console.log(weatherData);

            var temp = (weatherData.main.temp - 273.15);
            var climate = (weatherData.weather[0].description);

            res.write("<h1>" + cityEntered + "</h1> <br>");
            res.write(climate + " with a temperature of " + temp + " degree Celcius.");
            res.send();

        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});