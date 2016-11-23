var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body) {
    // takes time for server to get the stuff
    // so we need to pass a callback to tell request package
    // what to do when we get the response
    if (error) {
        console.log("SOMETHING WENT WRONG");
        console.log(error)
    } else if (response.statusCode == 200) {
        // THINGS WORKED
        var data = JSON.parse(body)
        console.log(data.query.results.channel.astronomy.sunset)
    }
}) 