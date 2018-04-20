import { twitter } from "./keys.js";

// code to read and set any environment variables
require("dotenv").config();

// importing file holding keys
let keys = require("./keys.js");

// accessing keys
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

