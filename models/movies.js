const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data schema and model
const movieSchema = new Schema({
    title: { type: String },
    genre: { type: String },
    year: { type: String }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;