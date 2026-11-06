import {Component} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../models/movie";
import {Configuration} from "../../models/configuration";
import {Genre} from "../../models/genre";

@Component({
  selector: 'genre-movies',
  templateUrl: './genre-movies.html',
  styleUrls: ['./genre-movies.css']
})
export class GenreMovies {
  public configuration: Configuration = <Configuration>{};
  public genre: Genre = <Genre>{};
  public movies: Movie[] = [];
  public page: number = 1;
  public totalPages: number = 0;
  public totalResults: number = 0;
  private readonly genreId: number;

  constructor(
    private tmdbService: TmdbService,
    private titleService: Title,
    private route: ActivatedRoute) {
    this.genreId = this.route.snapshot.params.id;
  }

  public ngOnInit(): void {
    this.tmdbService.getConfiguration()
      .then(config => this.configuration = config);

    this.tmdbService.getGenre(this.genreId).then(genre => {
      this.genre = genre;
      this.titleService.setTitle(this.genre.name);
    });

    this.getMoviesAndSetPagination();
  }
  public previousPage(): void {
    this.page -= 1;
    this.getMoviesAndSetPagination();
  }

  public nextPage(): void {
    this.page += 1;
    this.getMoviesAndSetPagination();
  }

  private getMoviesAndSetPagination(): void {
    this.tmdbService.getMoviesByGenre(this.genreId, this.page)
      .then(json => {
        this.movies = json.results;
        this.page = json.page;
        this.totalPages = json.total_pages;
        this.totalResults = json.total_results;
      });
  }
}
