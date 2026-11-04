import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetails} from "./pages/movieDetails/movieDetails";

@NgModule({
  declarations: [
    Frontpage,
    MovieDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [Frontpage]
})
export class AppModule {
}
