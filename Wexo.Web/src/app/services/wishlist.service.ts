import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly storageKey = 'wishlist';

  getWishlist(): number[] {
    const wishlist = localStorage.getItem(this.storageKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  add(movieId: number): void {
    const wishlist = this.getWishlist();

    if (!wishlist.includes(movieId)) {
      wishlist.push(movieId);
      this.save(wishlist);
    }
  }

  remove(movieId: number): void {
    const wishlist = this.getWishlist()
      .filter(id => id !== movieId);

    this.save(wishlist);
  }

  contains(movieId: number): boolean {
    return this.getWishlist().includes(movieId);
  }

  private save(wishlist: number[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(wishlist)
    );
  }
}
