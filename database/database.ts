import SQLite, {
  SQLiteDatabase,
  Transaction,
} from "react-native-sqlite-storage";

interface User {
  id: number;
  username: string;
}

interface Movie {
  id: number;
  genres: Genre[];
  original_title: string;
  original_language: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

// Classe pour gérer la base de données
class Database {
  private db: SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase(
      { name: "moviesDatabase.db", location: "default" },
      () => console.log("Base de données ouverte avec succès"),
      (error) =>
        console.error(
          "Erreur lors de l'ouverture de la base de données : ",
          error,
        ),
    );
  }

  public createTableMovies(): void {
    this.db.transaction((tx: Transaction) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, original_title TEXT, original_language TEXT, title TEXT, overview TEXT, poster_path TEXT, release_date TEXT,  vote_average REAL, vote_count INTEGER);",
        [],
        () => console.log("Table 'movies' successfully created"),
        (error) =>
          console.error("Erreur lors de la création de la table : ", error),
      );
    });
  }

  public createTableGenres(): void {
    this.db.transaction((tx: Transaction) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS genres (id INTEGER PRIMARY KEY, name TETX);",
        [],
        () => console.log("Table 'genres' successfully created"),
        (error) =>
          console.error("Erreur lors de la création de la table : ", error),
      );
    });
  }

  public createTableMoviesGenres(): void {
    this.db.transaction((tx: Transaction) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS moviesgenres (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER, genre_id INTEGER);",
        [],
        () => console.log("Table 'moviesgenres' successfully created"),
        (error) =>
          console.error("Erreur lors de la création de la table : ", error),
      );
    });
  }

  public insertMovie(movie: Movie): void {
    this.db.transaction((tx: Transaction) => {
      tx.executeSql(
        "INSERT INTO movies (id, original_title, original_language, title, overview, poster_path, release_date, vote_average, vote_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          movie.id,
          movie.original_title,
          movie.original_language,
          movie.title,
          movie.overview,
          movie.poster_path,
          movie.release_date,
          movie.vote_average,
          movie.vote_count,
        ],
        () => console.log("Movie successfully inserted"),
        (error) => console.error("Erreur lors de l'insertion : ", error),
      );

      movie.genres.forEach((genre) => {
        tx.executeSql(
          "INSERT INTO moviesgenres (movie_id, genre_id) VALUES (?, ?);",
          [movie.id, genre.id],
          () => console.log("Genre successfully inserted"),
          (error) =>
            console.error("Erreur lors de l'insertion du genre : ", error),
        );
      });
    });
  }

  public getMovies(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: Transaction) => {
        tx.executeSql(
          "SELECT * FROM movies;",
          [],
          (tx, results) => {
            const movies: Movie[] = [];
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              this.getGenresByMovieId(row.id).then((genres: Genre[]) => {
                movies.push({
                  id: row.id,
                  genres: genres,
                  original_title: row.original_title,
                  original_language: row.original_language,
                  title: row.title,
                  overview: row.overview,
                  poster_path: row.poster_path,
                  release_date: row.release_date,
                  vote_average: row.vote_average,
                  vote_count: row.vote_count,
                });
              });
            }

            resolve(movies);
          },
          (error) => {
            console.error("Erreur lors de la lecture : ", error);
            reject(error);
            return false;
          },
        );
      });
    });
  }

  public getGenres(): Promise<Genre[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: Transaction) => {
        tx.executeSql(
          "SELECT * FROM genres;",
          [],
          (tx, results) => {
            const genres: Genre[] = [];
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              genres.push({ id: row.id, name: row.name });
            }
            resolve(genres);
          },
          (error) => {
            console.error("Erreur lors de la lecture : ", error);
            reject(error);
            return false;
          },
        );
      });
    });
  }

  public getGenresByIds(genre_ids: number[]): Promise<Genre[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: Transaction) => {
        const placeholders = genre_ids.map(() => "?").join(", ");
        tx.executeSql(
          `SELECT * FROM genres WHERE id IN (${placeholders});`,
          genre_ids,
          (tx, results) => {
            const genres: Genre[] = [];
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              genres.push({ id: row.id, name: row.name });
            }
            resolve(genres);
          },
          (error) => {
            console.error("Erreur lors de la lecture : ", error);
            reject(error);
            return false;
          },
        );
      });
    });
  }

  public getGenresByMovieId(movie_id: number): Promise<Genre[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: Transaction) => {
        tx.executeSql(
          `SELECT g.id, g.name FROM genres g INNER JOIN moviesgenres mg ON g.id = mg.genre_id WHERE mg.movie_id = ?;`,
          [movie_id],
          (tx, results) => {
            const genres: Genre[] = [];
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              genres.push({ id: row.id, name: row.name });
            }
            resolve(genres);
          },
          (error) => {
            console.error("Erreur lors de la lecture : ", error);
            reject(error);
            return false;
          },
        );
      });
    });
  }
}

export default Database;
