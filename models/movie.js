import { readJSON } from "../utils.js"
import { randomUUID } from 'node:crypto'

// const movies = readJSON('../movies.json')
const movies = readJSON('./movies.json')

export class MovieModel {
    // recuperar todas las peliculas
    static getAll = async ({ genre }) => {
        if (genre) {
            return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        } 
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async createMovie({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        movies.push(newMovie)

        return newMovie
    }

    static async deleteMovie ({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex < 0) return false

        movies.splice(movieIndex, 1)
        return true
    }

    static async updateMovie ({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex < 0) return false

        const updatedMovie = { ...movies[movieIndex], ...input }
        movies[movieIndex] = updateMovie

        return updatedMovie
    }
}