import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component'
import { AnimalDataViewComponent } from './animal-data-view/animal-data-view.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserBookmarksComponent } from './user-bookmarks/user-bookmarks.component';
import { UserAnimalsComponent } from './user-animals/user-animals.component';
import { UserSendMessagesComponent } from './user-send-messages/user-send-messages.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';

import { AddAnimalComponent } from './add-animal/add-animal.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'addAnimmal', component: AddAnimalComponent, canActivate: [AuthGuard]},
  { path: 'editAnimmal', component: AnimalEditComponent, canActivate: [AuthGuard]},
  { path: 'viewAnimal', component: AnimalDataViewComponent, canActivate: [AuthGuard]},
  { path: 'searchAnimals', component: AnimalSearchComponent, canActivate: [AuthGuard]},
  { path: 'editUser', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'userBookmarks', component: UserBookmarksComponent, canActivate: [AuthGuard]},
  { path: 'userAnimals', component: UserAnimalsComponent, canActivate: [AuthGuard]},
  { path: 'userMessages', component: UserMessagesComponent, canActivate: [AuthGuard]},
  { path: 'sendMessage', component: UserSendMessagesComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
