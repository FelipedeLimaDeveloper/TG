import { UtilsService } from './services/utils.service';

import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatRadioModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule, MatBadgeModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnimalDataViewComponent } from './animal-data-view/animal-data-view.component';
import { UserDataViewComponent } from './user-data-view/user-data-view.component';
import { UserDataComponent } from './user-data/user-data.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserAnimalsComponent } from './user-animals/user-animals.component';
import { UserBookmarksComponent } from './user-bookmarks/user-bookmarks.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserSendMessagesComponent } from './user-send-messages/user-send-messages.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';
import { UserService } from './services/user.service';
import { AnimalService } from './services/animal.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AddAnimalComponent } from './add-animal/add-animal.component';


const firebaseConfig = {
  apiKey: "AIzaSyAonFcMaYtjKtPrTHpYIH7lEXKOYR_Y6Aw",
  authDomain: "authapp-bdf4f.firebaseapp.com",
  databaseURL: "https://authapp-bdf4f.firebaseio.com",
  projectId: "authapp-bdf4f",
  storageBucket: "authapp-bdf4f.appspot.com",
  messagingSenderId: "397377714819"
};

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    HomeComponent,
    AnimalDataViewComponent,
    UserDataViewComponent,
    UserDataComponent,
    NotFoundComponent,
    UserAnimalsComponent,
    UserBookmarksComponent,
    UserMessagesComponent,
    UserSendMessagesComponent,
    UserEditComponent,
    AnimalEditComponent,
    AnimalSearchComponent,
    AddAnimalComponent,
    
  ],
  imports: [
 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatBadgeModule, 
    UserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    ReactiveFormsModule
 // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthService, AuthGuard, AuthenticationService, UserService, AnimalService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
