import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetailsPage} from "./pages/movie-details/movie-details-page";
import {GenreMovies} from "./pages/genre-movies/genre-movies";
import {Wishlist} from "./pages/wishlist/wishlist";

const routes: Routes = [
  {path: '', component: Frontpage},
  {path: 'movie/:id', component: MovieDetailsPage},
  {path: 'genre/:id', component: GenreMovies},
  {path: 'wishlist', component: Wishlist}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
