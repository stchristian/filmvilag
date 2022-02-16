import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularMovieListComponent } from './popular-movie-list/popular-movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { HomeComponent } from './home/home.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';

const routes: Routes = [
  { path: 'movies/:id', component: MovieDetailsComponent},
  { path: 'tv/:id', component : TvDetailsComponent},
  { path: 'movies', component: HomeComponent},
  { path: 'person/:id', component: PersonDetailsComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
