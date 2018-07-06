import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  
  constructor(public afAuth: AngularFireAuth) { }

  provider = new firebase.auth.GoogleAuthProvider();
  
  login() {
    return this.afAuth.auth.signInWithPopup(this.provider);
  }
 

  logout() {
    return this.afAuth.auth.signOut();
  }
  
 

  // login(email:string, password: string ){
    
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //   //firebase.auth().createUserWithEmailAndPassword(email, password)
  // }
}
