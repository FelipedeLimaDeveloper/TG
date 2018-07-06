
import { Animal } from './../animal/animal';
import { Injectable } from '@angular/core';


import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';


@Injectable()
export class AnimalService {
  
  animalList: AngularFireList<any[]>

  animal: Animal = new Animal();
  tempAnimalView: Animal = new Animal();

  constructor(private angularFire: AngularFireDatabase ) {
    angularFire.list('/Animals')
    .valueChanges()
    .subscribe(data => {
      //console.log(data); // atualiza a cada mudança no firebase
    });
   }

  // getData () {
  //   this.animalList = this.angularFire.list('/animal');
  //   return this.animalList;
  // }

  insertAnimal (animal: Animal) {

    /**
     * Add Animal to Table
     */
    var ref = firebase.database().ref('/Animals')
    let uid = ref.push().key; // Gera um uid para o animal
    //console.log(uid);
    animal.animalId = uid; //atribui o uid para o animal
    return firebase.database().ref().child("/Animals").push(animal);
    /**
     * Update User Table with new animal
     */
    };

    getCurrentAnimal (aId: string) {
      const rootRef = firebase.database().ref().child('Animals');
      let key, obj;
      rootRef.orderByChild("animalId").equalTo(aId).once("value", snapshot => {
        //console.log(snapshot.val());
        key = Object.keys(snapshot.val())[0];  //Get the head key
        //console.log(key); 
      });
      const starCountRef = firebase.database().ref('Animals/' + key);
      starCountRef.on('value', function(snapshot) {
        obj = snapshot.val();
       
      });
      return obj;
    }

    searchAnimal (aId: string): any {
      //console.log(uid);
      const rootRef = firebase.database().ref().child('/Animals');
      console.log("root ",rootRef);
    }

    getAnimals(animalsUser: any): Array<string> {
      const rootRef = firebase.database().ref().child('/Animals');
      console.log("service ",animalsUser);
      let animalArray = new Array;
      let key;
      let obj = [];
      animalsUser.forEach(animalID => {
        rootRef.orderByChild("animalId").equalTo(animalID).once("value", snapshot => {
          //console.log(snapshot.val());
          //key.push(Object.keys(snapshot.val())[0]); 
          
          key = Object.keys(snapshot.val())[0];  //Get the head key
          animalArray.push(key);
        });

      });
      //console.log("saindo", animalArray);
      return animalArray;
    }

    loadAnimals(aId):any {
      let obj;
      //console.log("aid ", aId);
      const starCountRef = firebase.database().ref('Animals/' + aId);
      starCountRef.on('value', snapshot => {
        obj = snapshot.val();
        
       
      });
      //console.log("obj ", obj);
      return obj;
    }

    setAnimalView(animal: Animal) {
      this.tempAnimalView = animal;
    }

    getAnimalView(): Animal {
      return this.tempAnimalView;
    }

    updateAnimal (animal: Animal ) {
      console.log("1", animal);
      let c: string = this.searchAnimalUpdate(animal.animalId);
      console.log("2",c);
      firebase.database().ref("Animals/"+ c).update(animal);
    }


    searchAnimalUpdate (animalId: string): any {
      //console.log(uid);
      const rootRef = firebase.database().ref().child('Animals');
      let key;
  
      rootRef.orderByChild("animalId").equalTo(animalId).once("value", snapshot => {
        key = Object.keys(snapshot.val())[0];//pega a Key
      });
      return key;//Retorna a Key
    }

  

  // updateAnimal (animal : Animal) {
  //   this.animalList.update( animal.$key,{
  //     animalAbout: animal.animalAbout,
  //     animalStatus: animal.animalStatus,
  //     animalBorn: animal.animalBorn,
  //     animalBreed: animal.animalBreed,
  //     animalColor: animal.animalColor,
  //     animalAscending: animal.animalAscending,
  //     animalFeatures: animal.animalFeatures,
  //     animalHeight: animal.animalHeight,
  //     animalId: animal.animalId,
  //     animalName: animal.animalName,
  //     animalNationality: animal.animalNationality,
  //     animalNickname: animal.animalNickname,
  //     animalPhotos: animal.animalPhotos,
  //     animalPrizes: animal.animalPrizes,
  //     animalOwnerPhone: animal.animalOwnerPhone
  //   });
  // }

  // deleteAnimal ($key : string) {
  //   this.animalList.remove($key);
  // }
}
