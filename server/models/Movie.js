const { Schema, model } = require("mongoose");

// Creating Movie schema
const MovieSchema = new Schema({});

const Movie = model("Movie", MovieSchema);

module.exports = Movie;
