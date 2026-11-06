import {Component, OnInit} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {MovieDetails} from "../../models/movie-details";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {MovieCredits} from "../../models/movie-credits";
import {WishlistService} from "../../services/wishlist.service";
import {Configuration} from "../../models/configuration";

@Component({
  selector: 'movieDetailsPage',
  templateUrl: './movie-details-page.html',
  styleUrls: ['./movie-details-page.css']
})
export class MovieDetailsPage implements OnInit {
  public movieDetails: MovieDetails = <MovieDetails>{}
  public movieCredits: MovieCredits = <MovieCredits>{}
  private readonly movieId: number;
  public isInWishlist: boolean = false;
  public trailerUrl!: SafeResourceUrl;
  public configuration: Configuration = <Configuration>{};

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private titleService: Title,
    private wishlistService: WishlistService,
    private sanitizer: DomSanitizer) {
    this.movieId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.tmdbService.getConfiguration()
      .then(config => this.configuration = config);

    this.isInWishlist = this.wishlistService.contains(this.movieDetails);

    this.tmdbService.getMovieDetails(this.movieId)
      .then(movieDetails => {
        console.log(movieDetails);
        this.movieDetails = movieDetails;
        this.titleService.setTitle(`${this.movieDetails.title}`);

        this.movieCredits = movieDetails.credits;

        const trailer = movieDetails.videos.results.find(
          (video: any) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official
        );
        if(trailer) {
          this.setTrailerUrl(trailer.key);
        }
      });

    this.tmdbService.getMovieCredits(this.movieId)
      .then((movieCredits: MovieCredits) => this.movieCredits = movieCredits);

    this.tmdbService.getMovieVideos(this.movieId)
      .then((movieVideos: { results: any[] }) => {
        const trailer = movieVideos.results.find(
          (video: any) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official
        );
        this.setTrailerUrl(trailer.key);
      });
  }

  public updateWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.remove(this.movieDetails);
    } else {
      this.wishlistService.add(this.movieDetails);
    }

    this.isInWishlist = this.wishlistService
      .contains(this.movieDetails);
  }
  public setTrailerUrl(key: string): void {
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}`
    );
  }
}
