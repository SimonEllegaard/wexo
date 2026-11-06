import {Component} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {WishlistService} from "../../services/wishlist.service";
import {TmdbService} from "../../services/tmdb.service";

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  public wishlist: { id: number, title: string, poster_path: string }[] = [];

  constructor(
    private wishlistService: WishlistService,
    private titleService: Title) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle("Wishlist");
    this.wishlist = this.wishlistService.getWishlist();
  }
}
