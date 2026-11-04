import {Component, OnInit} from '@angular/core';
import {Genre} from "../../models/genre";
import {Movie} from "../../models/movie";
import {Configuration} from "../../models/configuration";
import {TmdbService} from "../../services/tmdb.service";

@Component({
  selector: 'frontpage',
  templateUrl: './frontpage.html',
  styleUrls: ['./frontpage.css']
})
export class Frontpage implements OnInit {
  public configuration: Configuration = <Configuration>{};
  genres: Genre[] = [];
  genresToDisplay = [
    'Action',
    'Comedy',
    'Thriller',
    'War',
    'Romance',
    'Drama',
    'Crime',
    'Documentary',
    'Horror'
  ];
  public genreMovies: Record<string, Movie[]> = {};
  public genreCount: Record<string, number> = {};

  constructor(
    private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    this.tmdbService.getConfiguration()
      .then(config => this.configuration = config);

    this.tmdbService.getGenres()
      .then(genres => {
        this.genres = this.filterGenres(genres);
        this.genres.forEach(genre => this.tmdbService.getMoviesByGenre(genre.id)
          .then(json => {
            this.genreMovies[genre.name] = json.results;
            this.genreCount[genre.name] = json.total_results;
          })
        );
      });
  }

  filterGenres(genres: any): Genre[] {
    return genres.filter((g: Genre) => this.genresToDisplay.indexOf(g.name) != -1);
  }

  scroll(element: HTMLDivElement, direction: 'left' | 'right'): void {
    const scrollAmount = 600;

    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
}
