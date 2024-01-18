const z = require('zod')

const movieSchema = z.object({
    title: z.string({invalid_type_error: 'Title must be a string', required_error: 'Title is required'}),
    genre: z.array(z.enum(
            ['Action', 'Adventure', 'Crime', 'Drama', 'Animation', 'Biography', 'Fantasy', 'Romance', 'Sci-Fi']
        )).min(1, {message: 'Genre must have at least one valid value'}),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10),
    poster: z.string().url({message: 'Poster must be a valid URL'})
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = {validateMovie, validatePartialMovie}