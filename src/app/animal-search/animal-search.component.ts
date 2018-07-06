import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../user/user';
@Component({
  selector: 'app-animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.css']
})
export class AnimalSearchComponent implements OnInit {

  constructor(
    private angularFire: AngularFireDatabase,
    private authService: AuthService
    
  ) { }

  animals: any;
  filteredAnimals: any;
  
  filters = {};

  filter: string;
  

  type: string = "";

  ngOnInit() {
   this. angularFire.list('/Animals')
    .valueChanges()
    .subscribe(data => {
      this.animals = data;
      this.applyFilters();
      //console.log(data); // atualiza a cada mudança no firebase
      
    });
  }

  private applyFilters () {
    this.filteredAnimals = _.filter(this.animals, _.conforms(this.filters));
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
    console.log(this.filteredAnimals);
    console.log(this.type);
    this.removeFilter(property);

  }

  filterGreatherThan (property: string, rule: any) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }
  filteredBoolean (property: string, rule: any) {
  if(!rule)
  this.removeFilter(property)
  else{
    this.filters[property] = val => val;
    this.applyFilters();
  }
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
  }
}
