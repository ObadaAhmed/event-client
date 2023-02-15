import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../auth/AuthGuard';
import {CompaniesComponent} from './companies/companies.component';
import {EventsComponent} from './events/events.component';
import {MycompanyComponent} from './mycompany/mycompany.component';
import {MyprofileComponent} from './myprofile/myprofile.component';

export const routes: Routes = [
  {
    path: 'signin',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
    data: { title: '', breadCrumbs: '' }
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'company',
    component: CompaniesComponent,
    pathMatch: 'full'
  },
  {
    path: 'events/:id',
    component: EventsComponent,
    pathMatch: 'full'
  },
  {
    path: 'myCompany',
    component: MycompanyComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile/:id',
    component: MyprofileComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
