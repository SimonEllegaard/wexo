import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetailsPage} from "./pages/movieDetails/movieDetailsPage";
import {GenreMovies} from "./pages/genreMovies/genreMovies";

const routes: Routes = [
  { path: '', component: Frontpage },
  { path: 'movie/:id', component: MovieDetailsPage },
  { path: 'genre/:id', component: GenreMovies },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
