import { UserService } from './../services/user.service';
import { AuthService } from './../auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: User = new User();
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private authService: AuthService,
     private router: Router,
     private userService: UserService
    ) { }

  login(){
      this.authService.login();
      // this.getUser();
      // console.log("1usuário",this.user);
      // this.userService.updateObjUserOBJ(this.user);
      
    }

  private getUser() {
    this.user = this.authService.getUser();
    console.log("2usuário",this.user);
    let obj = this.userService.getCurrentUser(this.user.userProviderId);
    console.log("3usuário",obj);
    //console.log(obj);
    this.user = obj;
    console.log("4usuário",this.user);
      //console.log(this.user);
     
  }
  

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}



// import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../services/authentication.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor(private router: Router) { }

//   ngOnInit() {
//   }

//   login() {
//      this.authService.login()
//     .then((data) => {
//       console.log(data);
//       alert('Login Realizado com Sucesso');
//     })
//     .catch((erro) => {
//       console.log(erro);
//       alert('Erro ao realizar o login');
//     this.router.navigate(['/loginForm']);
//   }

  
// }
