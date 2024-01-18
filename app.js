import express, { json } from 'express';
import cors from 'cors';
import { moviesRouter } from './routes/movies';

// leer un json en ESM
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by');

// recuperar todas las peliculas + filtradas por genero
app.get('/movies', )

// recuperar una pelicula por id
app.get('/movies/:id', )

// crear una nueva pelicula
app.post('/movies', )

// borrar una pelicula
app.delete('/movies/:id', )

// actualizar una pelicula
app.patch('/movies/:id', )

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})