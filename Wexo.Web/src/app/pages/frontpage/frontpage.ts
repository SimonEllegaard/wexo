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
  TmdbService: TmdbService;
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

  constructor() {
    this.TmdbService = new TmdbService();
  }

  ngOnInit(): void {
    this.TmdbService.getConfiguration()
      .then(config => this.configuration = config);

    this.TmdbService.getGenres()
      .then(genres => {
        this.genres = this.filterGenres(genres);
        this.genres.forEach(genre => this.TmdbService.getMoviesByGenre(genre.id)
          .then(movies =>
            this.genreMovies[genre.name] = movies));
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
