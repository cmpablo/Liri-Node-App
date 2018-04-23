# LIRI Node App

### What is this?

LIRI Node App is a **L**anguage **I**nterpretation and **R**ecognition **I**nterface. LIRI is a command line node app that takes in parameters and returns data. 

### How does it work?

Using the command line...

ask LIRI to get | command
--------------- | -----------------------------

the tweets of user See_Pablo | node liri.js my-tweets

song information from Spotify | node liri.js spotify-this-song Lets Go Crazy

movie information from OMDB | node liri.js movie-this John Wick

song information from Spotify of a mystery song (retrieved from external .txt doc) | node liri.js do-what-it-says

**Please Note:** LIRI's data is color-styled in a yellow, magenta, and blue theme. If a movie or song is not provided in the request, LIRI gets mad and returns data in red.

### Screenshots

Command: my-tweets
![my-tweets](/images/liri_tweets_chalk.jpg)

Command: spotify-this-song
![spotify-this](/images/liri_spotify_chalk.jpg)

Command: movie-this
![movie-this](/images/liri_movie_chalk.jpg)

Command: do-what-it-says
![do-what-it-says](/images/liri_doit_chalk.jpg)

### Technologies Applied

* node.js
* JavaScript
* Node Packages
    * Twitter
    * Node-Spotify-API
    * Request
    * DotEnv
    * Chalk