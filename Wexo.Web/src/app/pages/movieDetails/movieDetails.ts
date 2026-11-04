import {Component, OnInit} from "@angular/core";
import {TmdbService} from "../../services/tmdb.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'movieDetails',
  templateUrl: './movieDetails.html',
  styleUrls: ['./movieDetails.css']
})
export class MovieDetails implements OnInit {
  private movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
  }
}
