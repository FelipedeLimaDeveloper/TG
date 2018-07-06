import { UtilsService } from './../services/utils.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isFirstTime$: Observable<boolean>;
  user: User = new User();
  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isFirstTime$ = this.utilsService.isFirstTimeObservable;
    this.getUser();
    //console.log("1usuário",this.user);
    this.userService.updateObjUserOBJ(this.user);
  }

  private getUser() {
    this.user = this.authService.getUser();
    //console.log("2usuário",this.user);
    let obj = this.userService.getCurrentUser(this.user.userProviderId);
    //console.log("3usuário",obj);
    //console.log(obj);
    this.user = obj;
    //console.log("4usuário",this.user);
      //console.log(this.user);
     
  }
}
