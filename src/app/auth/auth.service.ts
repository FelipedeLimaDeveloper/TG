import { UserService } from './../services/user.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthService implements OnInit {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private userService: UserService, 
    private authService: AuthenticationService, 
    private router: Router
  ) {}
    user: User = new User();
  
    getUser (): User {
      return this.user;
    }
    ngOnInit() {
    }

  login() {
    this.authService.login()
    .then(response =>
      {
        this.user.userProviderId = response.user.uid;
        this.user.userName = response.user.displayName;
        this.user.userEmail = response.user.email;
        this.user.userPhoto = response.user.photoURL;
        this.user.userCity = "";
        this.user.userState = "";
        this.user.userAbout = "";
        this.user.userAnimals = [""];
        this.user.userBookmarks = [""];
        
        response.user.getIdToken().then(token => {
          this.user.userToken = token;
          
        if(response.additionalUserInfo.isNewUser) {
          //console.log("aqui ",this.user);
          this.userService.insertUser(this.user);
        }
          this.loggedIn.next(true);
          this.router.navigate(['home']);   
        });
      }).catch(error => 
      {
        alert(error.error)
      })
      
      // if(this.userService.searchUser(this.user.userProviderId) === 0)
      // {
      //   console.log("precisoInserir")
      
      // }
      // else {
      //   this.loggedIn.next(true);
      //   this.router.navigate(['home']);    
      // }       
  }

  logout() {
    this.authService.logout()
    .then(response =>
      {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      })
    .catch(error => 
      {alert(error.error)
      })
  }
  
}




//const profile = response.additionalUserInfo.profile;
        // const token: any = profile.id;
        // const user = response.additionalUserInfo.profile;
        // const email = response.additionalUserInfo.profile.email;
        
        // for (let prof in profile) {
        //   console.log(profile[prof]); 
        // }
        // console.log(token + user + email);