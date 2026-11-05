import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetailsPage} from "./pages/movieDetails/movieDetailsPage";
import {AppComponent} from "./app.component";
import {GenreMovies} from "./pages/genreMovies/genreMovies";

@NgModule({
  declarations: [
    AppComponent,
    Frontpage,
    MovieDetailsPage,
    GenreMovies
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
