import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {Genre} from "../../models/genre";
import {Movie} from "../../models/movie";
import {Configuration} from "../../models/configuration";

@Component({
  selector: 'frontpage',
  templateUrl: './frontpage.html',
  styleUrls: ['./frontpage.css']
})
export class Frontpage implements OnInit {
  public configuration!: Configuration;
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
      .then(data => this.configuration = data);

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(res => res.json())
      .then(json => {
        this.genres = this.mapAndFilterGenres(json);
        this.genres.forEach(genre => fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`, options)
          .then(res => res.json())
          .then(json => this.genreMovies[genre.name] = json.results))
      })
      .catch(err => console.error(err));
  }

  mapAndFilterGenres(input: any): Genre[]
  {
    return input.genres.filter((g: Genre) => this.genresToDisplay.indexOf(g.name) != -1)
  }

  scroll(element: HTMLDivElement, direction: 'left' | 'right'): void {
    const scrollAmount = 600;

    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
}
