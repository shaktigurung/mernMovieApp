import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([
    {
      title: '',
      genre: '',
      year: ''
    }
  ]);

  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    year: ''
  })

  useEffect(()=> {
    fetch('/movies')
      .then( res => {
        if(res.ok) {
          return res.json()
        }
      }).then(jsonRes => setMovies(jsonRes))
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie( prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  const addMovie = (e) => {
    e.preventDefault();
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }

    axios.post('/newmovie', newMovie)
    setMovie({ title: '', genre: '', year: ''});
  }

  const deleteMovie = (id) => {
    axios.delete('/delete/'+ id );
    //alert('Movie deleted')
  }

  return (
    <div className="App">
      <h1> React Application </h1>
      <h1> Add Movie</h1>
      <form>
        Title: <input onChange={handleChange} name="title" value={movie.title}></input>
        Genre: <input onChange={handleChange} name="genre" value={movie.genre}></input>
        Year: <input onChange={handleChange} name="year" value={movie.year} />
        <button onClick={addMovie}> Add Movie </button>
      </form>
      { movies && movies.map( movie => {
        return (
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <button onClick={() => deleteMovie(movie._id)}>DELETE</button>
          </div>
          )
      })}
    </div>
  );
}

export default App;
