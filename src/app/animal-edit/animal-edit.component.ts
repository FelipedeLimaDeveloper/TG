import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Animal } from '../animal/animal';
import { AuthService } from '../auth/auth.service';
import { AnimalService } from '../services/animal.service';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {

  

  animal: Animal = new Animal();
  public editAnimalInformationForm: FormGroup;

  public editUserInformation: FormGroup;  
  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private animalService: AnimalService,
    private userService: UserService,
  ) { 
    this.createFormEditAnimal();
    
  }

  ngOnInit() {
    this.animal = this.animalService.getAnimalView();
    console.log(this.animal);

    this.editAnimalInformationForm.get('animalId').setValue(this.animal.animalId);
    this.editAnimalInformationForm.get('animalName').setValue(this.animal.animalName);
    this.editAnimalInformationForm.get('animalNickname').setValue(this.animal.animalNickname);
    this.editAnimalInformationForm.get('animalBorn').setValue(this.animal.animalBorn);
    this.editAnimalInformationForm.get('animalBreed').setValue(this.animal.animalBreed);
    this.editAnimalInformationForm.get('animalColor').setValue(this.animal.animalColor);
    this.editAnimalInformationForm.get('animalHeight').setValue(this.animal.animalHeight);
    this.editAnimalInformationForm.get('animalNationality').setValue(this.animal.animalNationality);
    this.editAnimalInformationForm.get('animalAscending').setValue(this.animal.animalAscending);
    this.editAnimalInformationForm.get('animalPhotos').setValue(this.animal.animalPhotos);
    this.editAnimalInformationForm.get('animalPrizes').setValue(this.animal.animalPrizes);
    this.editAnimalInformationForm.get('animalFeatures').setValue(this.animal.animalFeatures);
    this.editAnimalInformationForm.get('animalAbout').setValue(this.animal.animalAbout);
    this.editAnimalInformationForm.get('animalOwnerPhone').setValue(this.animal.animalOwnerPhone);
    //this.editAnimalInformationForm.get('animalStatus').setValue(this.animal.animalStatus);
  }
  

  private createFormEditAnimal() {
    this.editAnimalInformationForm = this.formBuilder.group({
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
      //animalStatus: ['ATIVO' ,Validators.required]
    });
  }
  onUpdate() {
    this.animal = this.editAnimalInformationForm.value;
    this.animalService.updateAnimal(this.animal);
    //console.log(this.animal);

  }

  
}
