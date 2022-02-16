import { Component, OnInit, Input } from '@angular/core';
import { MovieDbService } from '../movie.service';
import { SearchResult } from '../models/search-result.type';
import { MovieListResult, PersonListResult, TvListResult } from '../models/list-result.types';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Ezzel a komponenssel tudunk filmek, sorozatok és személyek között keresni. 
 */
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  private keyword = "";
  private currentPage = 1;
  
  constructor(private movieService: MovieDbService, private route : ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.keyword = params.get('search');
      if(this.keyword == null) {
        this.keyword = "";
      }
      this.currentPage = Number(params.get('page'));
      if(this.currentPage == null || this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.startingPage = this.currentPage - 5 < 1 ? 1 : this.currentPage - 5;
      this.search(this.keyword, this.currentPage);
    })
  }

  /**
   * Keresünk a moviedb service segítségével
   * @param keyword 
   * @param page 
   */
  search(keyword: string, page: number) {
    if(keyword == "") {
      this.searchResult = null;
    }
    else {
      this.movieService.searchMulti(keyword, page)
      .subscribe( (data : SearchResult<any>) => {
        this.searchResult = data;
        this.total_pages = data.total_pages;
        //We need this for pagination
        this.pages = Array(this.searchResult.total_pages).fill(0).map((x,i) => i + 1);
      },
      (error) => {
        this.router.navigate(['']);
      });
    }
  }

  isMovie( object: MovieListResult | PersonListResult | TvListResult): object is MovieListResult {
    return object.media_type == "movie";
  }

  /**
   * Lekérjük a következő/előző oldalt.
   * @param page 
   */
  getPage(page : number) {
    if(page < 1) {
      page = 1;
    }
    else if(page > this.total_pages){
      page = this.total_pages;
    }
    this.router.navigate(['/'], { queryParams: {
      search : this.keyword,
      page
    }});
  }

  private total_pages: number;
  private pages: number[];
  private startingPage = 1;
  private searchResult : SearchResult<any>;

}
