import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AnimalService } from '../services/animal.service';
import { AuthService } from '../auth/auth.service';
import { Animal } from './../animal/animal';
import { User } from '../user/user';

@Component({
  selector: 'app-animal-data-view',
  templateUrl: './animal-data-view.component.html',
  styleUrls: ['./animal-data-view.component.css']
})
export class AnimalDataViewComponent implements OnInit {

  animal: Animal = new Animal();

  constructor(
    private router: Router,
    private userService: UserService,
    private animalService: AnimalService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.animal = this.animalService.getAnimalView();
    console.log(this.animal);
  }

  // getRealUser () {
  //   let realUser: User = this.userService.getRealUser();
  //   console.log("2",realUser);
  //   return realUser;
  // }

  

}
