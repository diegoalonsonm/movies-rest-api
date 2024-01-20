import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()
    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', movieController.getAll)
    moviesRouter.post('/', movieController.createMovie)

    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.delete('/:id', movieController.deleteMovie)
    moviesRouter.patch(':/id', movieController.updateMovie)

    return moviesRouter
}