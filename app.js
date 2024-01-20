import express, { json } from 'express';
import cors from 'cors';
import { createMovieRouter } from './routes/movies.js';
import 'dotenv/config';

// leer un json en ESM
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);

export const createApp = ({ movieModel }) => {
    const app = express()
    app.use(json())
    app.use(cors())
    app.disable('x-powered-by');

    app.use('/movies', createMovieRouter({ movieModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
}