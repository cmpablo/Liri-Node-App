// code to read and set any environment variables
require("dotenv").config();

// importing file holding keys
let keys = require("./keys.js");
let fs = require("fs");
let request = require("request");
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let chalk = require("chalk");

// accessing keys
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// variables
let nodeArg = process.argv;
let command = process.argv[2];
let userInput = "";

for (let i = 3; i < nodeArg.length; i++) {
    if (i > 3 && i < nodeArg.length) {
        userInput = userInput + "+" + nodeArg[i];
    } else {

        userInput += nodeArg[i];
    }
}


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
                console.log(chalk.yellow("--------------------------------------------------------------------\n"));
                console.log(chalk.magenta.inverse(tweets[i].created_at + "\n"));
                console.log(chalk.blue(tweets[i].text + "\n"));
            }
        }
    });

}

// if spotify-this-song is called
function spotifyThis() {

    if (userInput === "") {
        spotify
            .search({
                type: "track",
                query: "The Sign Ace of Base",
                limit: 1
            })
            .then(function (response) {
                let info = response.tracks.items;

                for (let i = 0; i < info.length; i++) {
                    if (info[i]) {
                        console.log(chalk.red("\n--------------------------------------------------------------------\n"));
                        console.log(chalk.redBright("Artist Name: " + info[i].artists[0].name));
                        console.log(chalk.redBright("Song Name: " + info[i].name));
                        console.log(chalk.redBright("Preview: " + info[i].album.href));
                        console.log(chalk.redBright("Album: " + info[i].album.name + "\n"));
                        console.log(chalk.cyan.inverse("PLEASE ENTER A VALID SONG REQUEST... TLC's Waterfalls might strike your fancy\n"));
                        console.log(chalk.red("--------------------------------------------------------------------\n"));

                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({
                type: "track",
                query: userInput,
                limit: 3
            })
            .then(function (response) {
                let info = response.tracks.items;

                for (let i = 0; i < info.length; i++) {
                    if (info[i]) {
                        console.log(chalk.yellow("\n--------------------------------------------------------------------\n"));
                        console.log(chalk.magenta("Artist Name: " + chalk.blue(info[i].artists[0].name)));
                        console.log(chalk.magenta("Song Name: " + chalk.blue(info[i].name)));
                        console.log(chalk.magenta("Preview: " + chalk.blue(info[i].album.href)));
                        console.log(chalk.magenta("Album: " + chalk.blue(info[i].album.name + "\n")));
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

// if movie-this is called
function movieOutput() {
    let nodeArg = process.argv;

    let movieURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    if (userInput === "") {
        // if no movie input
        console.log(chalk.yellow("\n--------------------------------------------------------------------\n"));
        console.log(chalk.red("If you haven't watched 'Mr. Nobody,' \nthen you should:" + chalk.cyan(" http://www.imdb.com/title/tt0485947/")));
        console.log(chalk.red("\nIt's on Netflix!\n"));
        console.log(chalk.yellow("--------------------------------------------------------------------\n"));
    } else {
        request(movieURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(chalk.yellow("\n--------------------------------------------------------------------\n"));
                console.log(chalk.magenta("Movie Title: " + chalk.blue(JSON.parse(body).Title)));
                console.log(chalk.magenta("Year Released: " + chalk.blue(JSON.parse(body).Year)));
                console.log(chalk.magenta("IMDB Rating: " + chalk.blue(JSON.parse(body).imdbRating)));
                console.log(chalk.magenta("Rotten Tomatoes Rating: " + chalk.blue(JSON.parse(body).Ratings[1].Value)));
                console.log(chalk.magenta("Produced in: " + chalk.blue(JSON.parse(body).Country)));
                console.log(chalk.magenta("Language: " + chalk.blue(JSON.parse(body).Language)));
                console.log(chalk.magenta("Feature Actors: " + chalk.blue(JSON.parse(body).Actors)));
                console.log(chalk.magenta("Plot: " + chalk.blue(JSON.parse(body).Plot + "\n")));
                console.log(chalk.yellow("--------------------------------------------------------------------\n"));
            }
        })
    }
}

// if do-what-it-says is called
function justDoIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            //console.log(data);

            var dataArr = data.split(",");
            console.log(dataArr);
            
            command = dataArr[0];
            userInput = dataArr[1];

            spotifyThis(command, userInput);
        }
    })
}