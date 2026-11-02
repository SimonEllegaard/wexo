import {Component, OnInit} from '@angular/core';
import {Genre} from "./models/genre";
import {Movie} from "./models/movie";
import {Configuration} from "./models/configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wexo-web';
  genres: Genre[] = [];
  genresToDisplay = [
    'Action',
    'Comedy',
    'Thriller',
    'War',
    'Romance',
    'Drama',
    'Crime',
    'Documentary',
    'Horror',
  ]
  public genreMovies: Record<string, Movie[]> = {};
  public configuration!: Configuration;

  ngOnInit(): void
  {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFjODNjOWUwMWUyM2JlM2NmYjAyMWVkNDhjOWRjNiIsIm5iZiI6MTc5MzQ0ODkwMy4xNDEsInN1YiI6IjZhZTVkYmM3NWY0MjI4MzE1MmYxOWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SSyM5XSlnmF7TgWNVLAgmSUAnZPRtaF5FnIFt9ChdJ8'
      }
    };

    fetch('https://api.themoviedb.org/3/configuration', options)
      .then(response => response.json())
      .then(data => {console.log(data); this.configuration = data});

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(res => res.json())
      .then(json => {
        this.genres = this.mapAndFilterGenres(json);
        this.genres.forEach(genre => fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`, options)
          .then(res => res.json())
          .then(json => { console.log(json); this.genreMovies[genre.name] = json.results}))
      })
      .catch(err => console.error(err));
  }

  mapAndFilterGenres(input: any): Genre[]
  {
    return input.genres.filter((g: Genre) => this.genresToDisplay.indexOf(g.name) != -1)
  }
}
