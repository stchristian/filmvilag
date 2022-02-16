import { Component, OnInit } from '@angular/core';
import { MovieDbService, MovieDetails, TvShowDetails } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { switchMap } from 'rxjs/operators';
import { Movie } from '../models/movie.type';
import { TvShow } from '../models/tv-show.type';

/**
 * Komponens a film részletes nézetére
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  private castStartingIndex = 0;
  private castPageSize = 10;
  private media_type : string;

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private movieService : MovieDbService ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie() {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.url[0].path == "movies") {
      this.movieService.getMovie(id).subscribe(data => {
        this.movie = data;
        console.log(data);
      });
    }
    else {
      this.movieService.getTvShow(id).subscribe(data => {
        this.tvshow = data;
        console.log(data);
      });
    }

  }

  nextCast(){
    this.castStartingIndex += this.castPageSize;
    const content : any = this.movie || this.tvshow;
    if(this.castStartingIndex > content.credits.cast.length ) {
      this.castStartingIndex -= this.castPageSize;
    }
  }
  prevCast() {
    this.castStartingIndex -= this.castPageSize;
    if(this.castStartingIndex < 0) {
      this.castStartingIndex = 0;
    }
  }
  
  private movie : MovieDetails;
  private tvshow : TvShowDetails;
}
