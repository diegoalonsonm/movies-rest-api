import mysql from 'mysql2/promise';

const defaultConfig = {
    host: 'localhost',
    user: "root",
    port: 3306,
    password: "Danm0309#",
    database: "moviesdb"
}

const connectionString = process.env.DATABASE_URL ?? defaultConfig

const connection = await mysql.createConnection(connectionString);

export class MovieModelDB {
    static async getAllDB({ genre }) {
        const [movies] = await connection.query(
            'SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movies;'
        )
        return movies;
    }

    static async getByIdDB({ id }) {
        const [movies] = await connection.query(
            'SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
            [id]
        )
        if (movies.length === 0) return null;

        return movies[0];
    }

    static async addToDB({ input }) {
        const {
            // genre: genreInput,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                'INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
                [uuid, title, year, director, duration, poster, rate]
            )
        } catch (err) {
            throw new Error('Error while inserting movie into DB')
        }

        const [movies] = await connection.query(
            `SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0]
    }

    static async deleteFromDB({ id }) {
        await connection.query(
            'DELETE FROM movies WHERE id = UUID_TO_BIN(?);',
            [id]
        )
        return "Movie deleted";
    }

    static async updateDB({ id, input}) {
        const {
            // genre: genreInput,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input

        await connection.query(
            'UPDATE movies SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
            [title, year, director, duration, poster, rate, id]
        )

        const [movies] = await connection.query(
            `SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        return movies[0]
    }
}