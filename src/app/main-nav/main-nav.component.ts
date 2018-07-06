
import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit  {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  isLoged: boolean = false;
  isLoggedIn$: Observable<boolean>;   
  

  constructor(private router: Router, 
    private authService: AuthService, 
    private breakpointObserver: BreakpointObserver,
    private utilsService: UtilsService
  ) {
    this.isLogin();
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }
  
  ngOnChanges() {
    this.isLogin();
  }

  isLogin() {
    this.authService.isLoggedIn.subscribe( response => {
      this.isLoged = response;
       });
  }

logout()
 {
   this.authService.logout();
   this.utilsService.resetObservable();
  }


  ClickMenu() {
    this.utilsService.isFirstTime();
  }
}
