import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../movie.service';
import { MovieListResult } from '../models/list-result.types';
import { PopularResponse } from '../models/popular-response.type';

@Component({
  selector: 'app-popular-movie-list',
  templateUrl: './popular-movie-list.component.html',
  styleUrls: ['./popular-movie-list.component.css']
})
export class PopularMovieListComponent implements OnInit {

  constructor(private movieService: MovieDbService ) { }

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe(result => {
      console.log(result);
      this.popularResponse = result;
    });
  }

  private popularResponse : PopularResponse<MovieListResult>;
}
