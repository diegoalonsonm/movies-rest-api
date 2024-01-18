import { MovieModel } from "../models/movie"
import { validateMovie, validatePartialMovie } from '../schemas/movies';

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
            
        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ error: 'Movie not found' })
    }

    static async createMovie(req, res) {
        const result = validateMovie(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newMovie = await MovieModel.createMovie({ input: result.data })
    
        return res.status(201).json(newMovie)
    }

    static async deleteMovie(req, res) {
        const { id } = req.params
        const result = await MovieModel.deleteMovie({ id })
        
        if (result === false) return res.status(404).json({ error: 'Movie not found' })
        
        return res.json({ message: 'Movie deleted' })
    }

    static async updateMovie (req, res) {
        const { id } = req.params
        const result = validatePartialMovie(req.body)
    
        if(!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const updatedMovie = await MovieModel.updateMovie({ id, input: result.data })
    
        return res.json(updatedMovie)
    }
}