import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel
    }

    getAll = async (req, res) => {
        const { genre } = req.query
        const movies = await this.movieModel.getAllDB({ genre })

        res.json(movies)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const movie = await this.movieModel.getByIdDB({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ error: 'Movie not found' })
    }

    createMovie = async (req, res) => {
        const result = validateMovie(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newMovie = await this.movieModel.addToDB({ input: result.data })
    
        return res.status(201).json(newMovie)
    }

    deleteMovie = async (req, res) => {
        const { id } = req.params
        const result = await this.movieModel.deleteFromDB({ id })
        
        if (result === false) return res.status(404).json({ error: 'Movie not found' })
        
        return res.json({ message: 'Movie deleted' })
    }

    updateMovie = async (req, res) => {
        const { id } = req.params
        const result = validatePartialMovie(req.body)
    
        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const updatedMovie = await this.movieModel.updateDB({ id, input: result.data })
    
        return res.json(updatedMovie)
    }
}