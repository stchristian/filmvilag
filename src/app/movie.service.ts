import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { map, retry, catchError } from 'rxjs/operators';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import { SearchResult } from './models/search-result.type';
import { MovieListResult, TvListResult, PersonListResult } from './models/list-result.types';
import { PopularResponse } from './models/popular-response.type';
import { Movie } from './models/movie.type';
import { Observable, throwError } from 'rxjs';
import { Credits } from './models/credit.type';
import { Person } from './models/person.type';
import { TvShow } from './models/tv-show.type';

export type MovieDetails = Movie & Credits;
export type TvShowDetails = TvShow & Credits;

/**
 * Service a themoviedb.org apijához. 
 */
@Injectable({
  providedIn: 'root'
})
export class MovieDbService {  
  private api_key = "e23fcee1b16637a9303b1fcd3d35d98d"; // Api kulcs
  private base_url = "https://api.themoviedb.org/3/"; // Api url-je
  private image_url;
  private logo;
  private configuration : Object;
  
  constructor(private http: HttpClient) {
    this.getConfiguration();
  }

  /**
   * Lekéri az API konfigurációját, nekünk csak a képekhez vezető URL kell.
   */
  getConfiguration() {
    this.http.get(`${this.base_url}configuration`, this.getQueryParams({}))
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(data => {
      this.configuration = data;
      this.image_url = data['images']['base_url'];
    })
  }

  get imgUrl(): string {
    return this.configuration['images']['base_url'];
  }

  getImgUrl() : string {
    return this.image_url;
  }

  /**
   * Filmek sorozatok és személyek között keresünk.
   * @param keyword
   * @param page 
   */
  searchMulti(keyword: string, page: number = 1) {
    const params = this.getQueryParams({ query: keyword, page: page});
    let obs = this.http.get<SearchResult<Object>>(`${this.base_url}search/multi`, params)
    .pipe(
      catchError(this.handleError)
    );
    return obs;
  }

  /**
   * Lekéri a napi legnépszerűbb filmeket.
   */
  getPopularMovies() {
    const params = this.getQueryParams({});
    return this.http.get<PopularResponse<MovieListResult>>(`${this.base_url}trending/movie/day`, params).pipe(
      map(popularResponse => {
        popularResponse.results.map((movie => {
          movie.poster_path = `${this.image_url}/original/${movie.poster_path}`;
          return movie;
        }))
        return popularResponse;
      })
    );
  }

  /**
   * Egy személy részletes adatait kérdezzük le.
   * @param id 
   */
  getPerson(id: string) {
    const params = this.getQueryParams();
    return this.http.get<Person>(`${this.base_url}person/${id}`, params).pipe(
      catchError(this.handleError),
    );
  }

  /**
   * Egy sorozat részletes adatait kérdezzük le
   * @param id 
   */
  getTvShow(id: string) : Observable<TvShowDetails> {
    const params = this.getQueryParams({ append_to_response : 'credits'});
    return this.http.get<TvShowDetails>(`${this.base_url}tv/${id}`, params).pipe(
      catchError(this.handleError),
      map(tvshow => {
        tvshow.poster_path = `${this.image_url}/original/${tvshow.poster_path}`;
        return tvshow;
      })
    );
  }

  /**
   * Egy film részletes adatait kérdezzük le.
   * @param id 
   */
  getMovie(id: string) : Observable<MovieDetails> {
    const params = this.getQueryParams({ append_to_response : 'credits'});
    return this.http.get<MovieDetails>(`${this.base_url}movie/${id}`, params).pipe(
      catchError(this.handleError),
      map(movie => {
        movie.poster_path = `${this.image_url}/original/${movie.poster_path}`;
        return movie;
      })
    );
  }

  /**
   * Az api kulcsunkkal és a többi paraméterrel együtt csinál nekünk egy query paramétereket tartalmazó objectet.
   * @param queryparams 
   */
  private getQueryParams(queryparams = {}) {
    return {
      params: {
        api_key: this.api_key,
        ...queryparams
      }
    }
  }

  /**
   * Hibakezelés
   * @param error 
   */
  private handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
