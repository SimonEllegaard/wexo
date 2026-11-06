import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetailsPage} from "./pages/movie-details/movie-details-page";
import {AppComponent} from "./app.component";
import {GenreMovies} from "./pages/genre-movies/genre-movies";
import {MovieCardComponent} from "./components/movie-card.component";
import {Wishlist} from "./pages/wishlist/wishlist";

@NgModule({
  declarations: [
    AppComponent,
    Frontpage,
    MovieDetailsPage,
    GenreMovies,
    MovieCardComponent,
    Wishlist
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
