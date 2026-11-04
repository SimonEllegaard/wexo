import {Component, OnInit, Pipe, PipeTransform} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {MovieDetails} from "../../models/movieDetails";
import {Title} from "@angular/platform-browser";
import {MovieCredits} from "../../models/movieCredits";
import {MovieVideos} from "../../models/movieVideos";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'movieDetailsPage',
  templateUrl: './movieDetailsPage.html',
  styleUrls: ['./movieDetailsPage.css']
})
export class MovieDetailsPage implements OnInit {
  public movieDetails: MovieDetails = <MovieDetails>{}
  public movieCredits: MovieCredits = <MovieCredits>{}
  public movieVideos: MovieVideos = <MovieVideos>{}
  private readonly movieId: number;
  public isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private titleService: Title,
    private wishlistService: WishlistService) {
    this.movieId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.isInWishlist = this.wishlistService.contains(this.movieId);
    this.tmdbService.getMovieDetails(this.movieId)
      .then(movieDetails => {
        this.movieDetails = movieDetails;
        this.titleService.setTitle(`${this.movieDetails.title}`);
      });
    this.tmdbService.getMovieCredits(this.movieId)
      .then(movieCredits => this.movieCredits = movieCredits);
    this.tmdbService.getMovieVideos(this.movieId)
      .then(movieVideos => this.movieVideos = movieVideos);
  }

  updateWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.remove(this.movieId);
    } else {
      this.wishlistService.add(this.movieId);
    }

    this.isInWishlist = this.wishlistService
      .contains(this.movieId);
  }
}

@Pipe({ name: 'formatMovieProperty' })
export class FormatMovieProperty implements PipeTransform {
  transform(value: string): string {
    if(value.indexOf('"') != -1)
    {
      value = value.replace(/"/g,'');
    }
    return value;
  }
}
