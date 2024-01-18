const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const {validateMovie, validatePartialMovie} = require('./schemas/movies');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by');

// recuperar todas las peliculas + filtradas por genero
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filteredMovies)
    }

    res.json(movies)
})

// recuperar una pelicula por id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ error: 'Movie not found' })
})

// crear una nueva pelicula
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = { id: crypto.randomUUID(), ...result.data }
    movies.push(newMovie)

    return res.status(201).json(newMovie)
})

// borrar una pelicula
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex < 0) return res.status(404).json({ error: 'Movie not found' })

    movies.splice(movieIndex, 1)
    return res.json({ success: true })
})

// actualizar una pelicula
app.patch('/movies/:id', (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex < 0) return res.status(404).json({ error: 'Movie not found' })

    const updateMovie = { ...movies[movieIndex], ...result.data }
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})