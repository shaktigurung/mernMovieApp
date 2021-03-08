const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const mongoose = require('mongoose');

//const Movie = require('./models/movies');

const PORT= process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

//mongoose database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  });

//data schema and model
const movieSchema = {
    title:  String,
    genre: String,
    year: String 
}

const Movie = mongoose.model('Movie', movieSchema);

//API routes
app.get('/movies', (req, res) => {
    Movie.find()
        .then(movies => res.json(movies));
});

app.post('/newmovie', (req, res) => {
    const title = req.body.title;
    const genre = req.body.genre;
    const year = req.body.year;

    const newMovie = new Movie({
        title,
        genre,
        year
    });

    newMovie.save()

})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Movie.findByIdAndDelete({_id: id})
        .then(result => {
            console.log("movie deleted")
            res.json({ redirect: '/'});
        })
        .catch((err) => {
            console.log(err)
        })

});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Server listen
app.listen(PORT, () => {
    console.log(`Server is running at PORT : ${PORT}`)
});


