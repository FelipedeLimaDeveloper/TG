import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  user: User = new User();
  public editUserInformation: FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { 
      this.createFormEditUser();
    }


  ngOnInit() {
    this.getUser();
    
    // console.log(this.user);
    this.editUserInformation.get('userName').setValue(this.user.userName);
    this.editUserInformation.get('userEmail').setValue(this.user.userEmail);
    this.editUserInformation.get('userProviderId').setValue(this.user.userProviderId);
    this.editUserInformation.get('userPhoto').setValue(this.user.userPhoto);
    this.editUserInformation.get('userCity').setValue(this.user.userCity);
    this.editUserInformation.get('userState').setValue(this.user.userState);
    this.editUserInformation.get('userAbout').setValue(this.user.userAbout);
    this.editUserInformation.get('userToken').setValue(this.user.userToken);
  }

  private createFormEditUser() {
    this.editUserInformation = this.formBuilder.group({
      userProviderId: ['' ,Validators.required],
      userName:   ['' ,Validators.required],
      userEmail:  ['' ,Validators.required],
      userCity:   ['' ,],
      userState:  ['' ,],
      userPhoto:  ['' ,],
      userAbout:  ['' ,],
      //userBookmarks: [, ],
      userToken:  ['' ,],
     // userAnimals:  [, ],
      //userPhone:  ['' ,Validators.required],
    });
  }
  selectedFile = null;
  onUpdate () {
    //console.log("FORM ", this.editUserInformation);
    //console.log("FORM ", this.user);
    this.userService.updateUser(this.editUserInformation);
    this.userService.updateObjUser(this.editUserInformation);
    //console.log("1",this.editUserInformation);
  }

  private getUser() {
    this.user = this.authService.getUser();
    let obj = this.userService.getCurrentUser(this.user.userProviderId);
    //console.log(obj);
    this.user = obj;
    //console.log(this.user);
   
  }

  private onFileSelected(eventChange) {
    if(eventChange.target.files && eventChange.target.files[0]) {
      var reader = new FileReader();
    }
    reader.onload = (event:any) => {
      this.user.userPhoto = event.target.result;
    }
    reader.readAsDataURL(eventChange.target.files[0]);
    console.log(eventChange.target.value);

    // this.selectedFile = eventChange.target.files[0];
    // this.user.userPhoto = eventChange.target.value;
  }

 
  


  

}
