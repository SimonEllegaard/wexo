import {Component, OnInit} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {MovieDetails} from "../../models/movieDetails";

@Component({
  selector: 'movieDetailsPage',
  templateUrl: './movieDetailsPage.html',
  styleUrls: ['./movieDetailsPage.css']
})
export class MovieDetailsPage implements OnInit {
  private movieId!: number;
  public movieDetails: MovieDetails = <MovieDetails>{}
  public movieDetailsString: string = "";

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.tmdbService.getMovieDetails(this.route.snapshot.params.id)
      .then(movieDetails => {this.movieDetailsString = JSON.stringify(movieDetails); console.log(this.movieDetails);});
  }
}
