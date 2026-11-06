import {Component} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {WishlistService} from "../../services/wishlist.service";
import {TmdbService} from "../../services/tmdb.service";
import {Configuration} from "../../models/configuration";
import {Movie} from "../../models/movie";

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  public configuration: Configuration = <Configuration>{};
  public wishlist: Movie[] = [];

  constructor(
    private wishlistService: WishlistService,
    private tmdbService: TmdbService,
    private titleService: Title) {
  }

  public ngOnInit(): void {
    this.tmdbService.getConfiguration()
      .then(config => this.configuration = config);
    this.titleService.setTitle("Wishlist");
    this.wishlist = (this.wishlistService.getWishlist() as Movie[]);
  }

  public removeWishlist(movie: Movie): void {
    if (!window.confirm('Remove this movie from your wishlist?')) {
      return;
    }
    this.wishlistService.remove(movie);

    this.wishlist = (this.wishlistService.getWishlist() as Movie[]);
  }
}
