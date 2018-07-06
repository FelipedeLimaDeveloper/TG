import { AuthService } from './../auth/auth.service';
import { UserService } from './../services/user.service';
import { AnimalService } from './../services/animal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Animal } from '../animal/animal';
import { User } from '../user/user';
import * as moment from 'moment';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  public dateMask: string = '99/99/9999';
  public animalInformationForm: FormGroup;
  animal: Animal = new Animal();
  objCurrentUser: User = new User();
  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { 
    this.createFormAddAnimal();
  }

  ngOnInit() {
    
  }

  private createFormAddAnimal() {
    this.animalInformationForm = this.formBuilder.group({
      animalUserId: [this.authService.user.userProviderId ,Validators.required],
      animalId: ['' ,Validators.required],
      animalName: ['' ,Validators.required],
      animalNickname: ['' ,Validators.required],
      animalBorn: ['' ,Validators.required], 
      animalBreed: ['' ,Validators.required],
      animalColor: ['' ,Validators.required],
      animalHeight: ['' ,Validators.required],
      animalNationality: ['' ,Validators.required],
      animalAscending: ['' ,Validators.required],
      animalFeatures: ['' ,Validators.required],
      animalPhotos: ['' ,Validators.required],
      animalPrizes: ['' ,Validators.required],
      animalOwnerPhone: ['' ,Validators.required],
      animalAbout: ['' ,Validators.required],
      animalStatus: ['ATIVO' ,Validators.required]
    });
  }



  onSubmit() {
    this.animal = this.animalInformationForm.value;
    

    this.animalService.insertAnimal(this.animal);

    let currentUser  = this.authService.getUser();

    this.objCurrentUser =  this.userService.getCurrentUser(currentUser.userProviderId);
    

    this.objCurrentUser.userAnimals.push(this.animal.animalId);
    this.userService.updateUserObj(this.objCurrentUser);
    // console.log(this.animalInformationForm.value);
    // console.log(this.animal);
  }
}
