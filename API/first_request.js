var request = require('request');
request('adsf', function(error, response, body) {
    // takes time for server to get the stuff
    // so we need to pass a callback to tell request package
    // what to do when we get the response
    if (error) {
        console.log("SOMETHING WENT WRONG");
        console.log(error)
    } else if (response.statusCode == 200) {
        // THINGS WORKED
        console.log(body)
    }
}) 