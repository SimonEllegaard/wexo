import {Configuration} from "../models/configuration";
import {Genre} from "../models/genre";
import {Injectable} from "@angular/core";
import {MovieDetails} from "../models/movieDetails";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  public async getConfiguration(): Promise<Configuration> {
    try {
      return await this.fetchAndGetJson('https://api.themoviedb.org/3/configuration');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getGenres(): Promise<Genre[]> {
    try {
      const json = await this.fetchAndGetJson('https://api.themoviedb.org/3/genre/movie/list?language=en');
      return json.genres;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getMoviesByGenre(genreId: number): Promise<any> {
    try {
      return await this.fetchAndGetJson(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie/${movieId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async fetchAndGetJson(url: string): Promise<any> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFjODNjOWUwMWUyM2JlM2NmYjAyMWVkNDhjOWRjNiIsIm5iZiI6MTc5MzQ0ODkwMy4xNDEsInN1YiI6IjZhZTVkYmM3NWY0MjI4MzE1MmYxOWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SSyM5XSlnmF7TgWNVLAgmSUAnZPRtaF5FnIFt9ChdJ8'
      }
    };
    const response = await fetch(url, options);
    return await response.json();
  }
}
