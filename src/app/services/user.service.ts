


import { Injectable } from '@angular/core';


import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../user/user';


// import { OwnerAnimal } from '../user/user'

@Injectable()
export class UserService {

  userList: AngularFireList<any>;
  user: User =  new User();
  realUserObj: User = new User();

  // ownerAnimalList: AngularFireList<any>
  // ownerAnimal: OwnerAnimal = new OwnerAnimal();

  constructor(private angularFire: AngularFireDatabase ) {
    angularFire.list('/User')
    .valueChanges()
    .subscribe(data => {
      //console.log(data); // atualiza a cada mudança no firebase
    });
  }

  getDataUser () {
    this.userList = this.angularFire.list('/User');
    return this.userList;
  }

  getCurrentUser (uid: string) {
    const rootRef = firebase.database().ref().child('User');
    let key, obj;
    rootRef.orderByChild("userProviderId").equalTo(uid).once("value", snapshot => {
      //console.log(snapshot.val());
      key = Object.keys(snapshot.val())[0];  
      //console.log(key); 
    });
    const starCountRef = firebase.database().ref('User/' + key);
    starCountRef.on('value', function(snapshot) {
      obj = snapshot.val();
     
    });
    return obj;
  }

  insertUser ( user : User ) {
    //console.log("aqui ",user);
    return firebase.database().ref().child("/User").push(user);
    // this.userList.push({
    //   userProviderId: user.userProviderId,
    //   userName: user.userName,
    //   userEmail: user.userEmail,
    //   userCity: user.userCity,
    //   userState: user.userState,
    //   userPhoto: user.userPhoto,
    //   userBookmarks: user.userBookmarks,
    //   userAbout: user.userAbout
    // });
  }

  searchUser (uid: string): any {
    const rootRef = firebase.database().ref().child('User');

    rootRef.orderByChild("userProviderId").equalTo(uid).on("value", snapshot => {
      if(snapshot.val() == null){
        //console.log("null");
        return 0;
      }
      else {
        //console.log("has");
        return 1;
      }
      
    });
  }

  searchUser2 (uid: string): any {
    //console.log(uid);
    const rootRef = firebase.database().ref().child('User');
    let key;

    rootRef.orderByChild("userProviderId").equalTo(uid).once("value", snapshot => {
      key = Object.keys(snapshot.val())[0];//pega a Key
    });
    return key;//Retorna a Key
  }
    
  updateObjUser (userUpdated: FormGroup) {
    this.realUserObj = userUpdated.value;
    console.log("real user  ",this.realUserObj)
  }

  updateObjUserOBJ (userUpdated: User) {
    this.realUserObj = userUpdated;
    console.log("real user usService ",this.realUserObj)
  }
  // updateObjUserOBJ (userUpdated: ) {

  //   this.realUserObj = userUpdated;
  //   console.log("real user  ",this.realUserObj)

  // }

  getRealUser () {
    return this.realUserObj;
  }
  

  updateUser ( user: FormGroup ) {
    let c: string = this.searchUser2(user.value.userProviderId);
    firebase.database().ref("User/"+ c).update(user.value);
    
    // this.userList.update( user.userProviderId,{
    //   userProviderId: user.userProviderId,
    //   userName: user.userName,
    //   userEmail: user.userEmail,
    //   userCity: user.userCity,
    //   userState: user.userState,
    //   userPhoto: user.userPhoto,
    //   userBookmarks: user.userBookmarks,
    //   userAbout: user.userAbout
    // });
  }

  updateUserObj ( user: User ) {
    console.log(user);
    let c: string = this.searchUser2(user.userProviderId);
    console.log(c);
    firebase.database().ref("User/"+ c).update(user);
    
    // this.userList.update( user.userProviderId,{
    //   userProviderId: user.userProviderId,
    //   userName: user.userName,
    //   userEmail: user.userEmail,
    //   userCity: user.userCity,
    //   userState: user.userState,
    //   userPhoto: user.userPhoto,
    //   userBookmarks: user.userBookmarks,
    //   userAbout: user.userAbout
    // });
  }

  deleteUser ($key : string) {
    this.userList.remove($key);
  }

/////////////////////////////OWNER -- ANIMAL

  // getDataOwner () {
  //   this.ownerAnimalList = this.firebase.list('OwnerAnimal');
  //   return this.ownerAnimalList;
  // }


  // insertOwnerAnimal ( ownerAnimal : OwnerAnimal ) {
  //   this.ownerAnimalList.push({
  //     ownerAnimals: ownerAnimal.ownerAnimals,
  //     ownerPhone: ownerAnimal.ownerPhone,
  //     ownerUserId: ownerAnimal.ownerPhone
  //   });
  // }

  // updateOwnerAnimal ( ownerAnimal : OwnerAnimal ) {
  //   this.ownerAnimalList.update( ownerAnimal.$key,{
  //     ownerAnimals: ownerAnimal.ownerAnimals,
  //     ownerPhone: ownerAnimal.ownerPhone,
  //     ownerUserId: ownerAnimal.ownerPhone
  //   });
  // }

  // deleteOwnerAnimal ($key : string) {
  //   this.ownerAnimalList.remove($key);
  // }
  
}


