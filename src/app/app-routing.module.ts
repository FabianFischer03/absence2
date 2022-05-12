import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencePageComponent } from './absence-page/absence-page.component';
import { AuthComponent } from './auth/auth.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: "", redirectTo: "sign-in", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "profile", component: ProfileComponent },
  { path: "absence-page", component: AbsencePageComponent },
  { path: "group-page", component: GroupPageComponent },
  { path: "auth", component: AuthComponent },
  { path: '**', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
