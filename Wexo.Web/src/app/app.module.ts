import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {Frontpage} from "./pages/frontpage/frontpage";
import {FormatMovieProperty, MovieDetailsPage} from "./pages/movieDetails/movieDetailsPage";
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    Frontpage,
    MovieDetailsPage,
    FormatMovieProperty
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
