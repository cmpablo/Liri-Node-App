// code to read and set any environment variables
require("dotenv").config();

// importing file holding keys
let keys = require("./keys.js");
let fs = require("fs");
let request = require("request");
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');

// accessing keys
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// variables
let command = process.argv[2];


// directs which action will be run
switch (command) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieOutput();
        break;

    case "do-what-it-says":
        justDoIt();
        break;
}

// if my-tweets is called
function showTweets() {
    var params = {
        screen_name: 'see_pablo'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (i = 0; i < 19; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text + "\n");
            }
        }
    });

}

// if spotify-this-song is called
function spotifyThis() {

}

// if movie-this is called
function movieOutput() {
    let nodeArg = process.argv;
    let movieName = "";

    for (let i = 3; i < nodeArg.length; i++) {
        if (i > 3 && i < nodeArg.length) {
            movieName = movieName + "+" + nodeArg[i];
        } else {

            movieName += nodeArg[i];
        }
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\nMovie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Feature Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot + "\n");
        }
    })

}

// if do-what-it-says is called
function justDoIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            throw err;
        } else {

        }
    })
}