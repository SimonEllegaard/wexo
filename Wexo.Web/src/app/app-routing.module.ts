import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Frontpage} from "./pages/frontpage/frontpage";
import {MovieDetails} from "./pages/movieDetails/movieDetails";

const routes: Routes = [
  { path: '', component: Frontpage },
  { path: 'movie/:id', component: MovieDetails },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
