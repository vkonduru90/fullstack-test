import {LoginComponent} from './public/login/login.component';
import {AuthGuard} from './guards/auth-guard.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from '@app/private/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent}, // canActivate: [AuthGuard]
  {path: '**', pathMatch: 'full', redirectTo: '/login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeingComponents = [
  LoginComponent,
  DashboardComponent
];
