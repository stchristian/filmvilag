import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person.type';
import { MovieDbService } from '../movie.service';

/**
 * Komponens egy személ részletes adatainak megjelenítésére
 */
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  private person: Person;
  private id: string;
  constructor(private route: ActivatedRoute, private movieDbService: MovieDbService) { }

  ngOnInit() {
    this.getPerson();
  }

  getPerson(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.movieDbService.getPerson(this.id).subscribe(data => {
      this.person = data;
      console.log(this.person);
    });
  }

}
