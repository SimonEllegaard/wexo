import { Injectable } from '@angular/core';
import {MovieDetails} from "../models/movie-details";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly storageKey = 'wishlist';

  getWishlist(): { id: number, title: string, poster_path: string }[] {
    const wishlist = localStorage.getItem(this.storageKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  add(movie: MovieDetails): void {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(this.toLocalStorageMovie(movie))) {
      wishlist.push(this.toLocalStorageMovie(movie));
      this.save(wishlist);
    }
  }

  remove(movie: MovieDetails): void {
    const wishlist = this.getWishlist()
      .filter(wishlistMovie => wishlistMovie.id !== movie.id);

    this.save(wishlist);
  }

  contains(movie: MovieDetails): boolean {
    return this.getWishlist().includes(this.toLocalStorageMovie(movie));
  }

  private toLocalStorageMovie(movie: MovieDetails): { id: number, title: string, poster_path: string } {
    return { id: movie.id, title: movie.title, poster_path: movie.poster_path }
  }

  private save(wishlist: { id: number, title: string, poster_path: string }[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(wishlist)
    );
  }
}
