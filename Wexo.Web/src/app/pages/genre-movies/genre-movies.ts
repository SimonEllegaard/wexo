import {Component} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../models/movie";
import {Configuration} from "../../models/configuration";

@Component({
  selector: 'genre-movies',
  templateUrl: './genre-movies.html',
  styleUrls: ['./genre-movies.css']
})
export class GenreMovies {
  public configuration: Configuration = <Configuration>{};
  private readonly genreId: number;
  public movies: Movie[] = [];
  public totalCount: number = 0;

  constructor(
    private tmdbService: TmdbService,
    private titleService: Title,
    private route: ActivatedRoute) {
    this.genreId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.tmdbService.getConfiguration()
      .then(config => this.configuration = config);

    this.titleService.setTitle(`Frontpage`);

    this.tmdbService.getMoviesByGenre(this.genreId)
      .then(json => {
        this.movies = json.results;
        this.totalCount = json.total_results;
      });
  }
}
