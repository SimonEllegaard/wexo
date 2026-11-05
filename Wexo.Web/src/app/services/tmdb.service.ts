import {Configuration} from "../models/configuration";
import {Genre} from "../models/genre";
import {Injectable} from "@angular/core";
import {MovieDetails} from "../models/movieDetails";
import {MovieCredits} from "../models/movieCredits";

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

  public async getMoviesByGenre(genreId: number): Promise<{ results: any[], total_results: number }> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`);
  }

  public async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie/${movieId}`);
  }

  public async getMovieCredits(movieId: number): Promise<MovieCredits> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie/${movieId}/credits`);
  }

  public async getMovieVideos(movieId: number): Promise<{ results: any[] }> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
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
    if (!response.ok) {
      throw new Error('Failed to fetch movie videos');
    }
    return await response.json();
  }
}
