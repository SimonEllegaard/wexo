import {Configuration} from "../models/configuration";
import {Genre} from "../models/genre";
import {Injectable} from "@angular/core";
import {MovieDetails} from "../models/movie-details";
import {MovieCredits} from "../models/movie-credits";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private genres: Genre[] = [];

  public async getConfiguration(): Promise<Configuration> {
    try {
      return await this.fetchAndGetJson('https://api.themoviedb.org/3/configuration');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getGenres(): Promise<Genre[]> {
    const json = await this.fetchAndGetJson('https://api.themoviedb.org/3/genre/movie/list');
    return json.genres;
  }

  public async getGenre(genreId: number): Promise<Genre> {
    const json = await this.fetchAndGetJson('https://api.themoviedb.org/3/genre/movie/list');
    return json.genres.filter((genre: Genre) => genre.id == genreId)[0];
  }

  public async getMoviesByGenre(genreId: number, page: number = 1): Promise<{ results: any[], total_results: number, page: number, total_pages: number }> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`);
  }

  public async getMoviesByIds(movieIds: number[]): Promise<{ results: any[], total_results: number, page: number, total_pages: number }> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie${movieIds[0]}`);
  }

  public async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await this.fetchAndGetJson(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,credits`);
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
        Authorization: `Bearer ${environment.tmdb.accessToken}`
      }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch movie videos');
    }
    return await response.json();
  }
}
