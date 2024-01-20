import { createApp } from "./app.js";
import { MovieModelDB} from "./models/mysql/movie.js";

createApp({ movieModel: MovieModelDB })