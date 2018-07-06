import { Animal } from './../animal/animal';
import { AuthService } from './../auth/auth.service';

import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user.service';
import { AnimalService } from '../services/animal.service';
import { User } from '../user/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-animals',
  templateUrl: './user-animals.component.html',
  styleUrls: ['./user-animals.component.css']
})
export class UserAnimalsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private animalService: AnimalService,
    private authService: AuthService,
    private router: Router
  ) { }

  private userAnimals: Animal[];
  public animaisObj;
  public userId = this.authService.getUser().userProviderId;
  public user: User = this.userService.getCurrentUser(this.userId);

  loadAnimals() {
    let animals = this.user.userAnimals;
    //console.log(animals);
    let key = new Array;
    let allAnimals = new Array;
    key = this.animalService.getAnimals(animals);
    //console.log("chegando", key);
    // console.log(animals.length);


    key.forEach(one => {
      allAnimals.push(this.animalService.loadAnimals(one));
    })
   // console.log(allAnimals);
   

    // animals.forEach(animalId => {
    //   console.log("animalId", animalId);
    //     let tempAnimalId = this.animalService.searchAnimal(animalId);
    //     console.log("tempAnimal" ,tempAnimalId);
       

      // this.userAnimals.push(tempAnimalId);
   

    //console.log(this.userAnimals);
    return allAnimals;
  }

  // getCurrentImg(): string {
  //   let newUser: User = new User();
  //    newUser = this.userService.getCurrentUser(this.user.userProviderId);
  //    return newUser.userPhoto;
  // }

  getRealUser () {
    let realUser: User = this.userService.getRealUser();
   // console.log("2",realUser);
    return realUser;
  }
  
  ngOnInit() {
   this.animaisObj = this.loadAnimals();
   //console.log(this.animaisObj);
   this.getRealUser();
  }
  
  viewAnimal (animal: Animal) {
    this.animalService.setAnimalView(animal);
    //console.log(animal);
    this.router.navigate(['editAnimmal']);   



  }


  





}
