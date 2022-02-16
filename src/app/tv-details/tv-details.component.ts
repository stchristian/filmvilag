import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDbService, TvShowDetails } from '../movie.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {

  private castStartingIndex = 0;
  private castPageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieDbService) { }

  ngOnInit() {
    this.getTvShow();
  }

  getTvShow() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getTvShow(id).subscribe(data => {
      this.tvshow = data;
      console.log(data);
    });
  }

  nextCast() {
    this.castStartingIndex += this.castPageSize;
    if (this.castStartingIndex > this.tvshow.credits.cast.length) {
      this.castStartingIndex -= this.castPageSize;
    }
  }
  prevCast() {
    this.castStartingIndex -= this.castPageSize;
    if (this.castStartingIndex < 0) {
      this.castStartingIndex = 0;
    }
  }

  private tvshow: TvShowDetails;
}
